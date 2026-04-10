import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // ─── Prefix global ───────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ─── CORS ─────────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ─── Validation globale ───────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: false,
    }),
  );

  // ─── Swagger ──────────────────────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription(
      `## API de gestion des utilisateurs avec authentification JWT

### 🔐 Authentification
1. **Inscrivez-vous** via \`POST /users/register\`
2. **Connectez-vous** via \`POST /auth/login\` pour obtenir un token JWT
3. Cliquez sur **Authorize** 🔒 et entrez : \`Bearer <votre_token>\`
4. Vous pouvez maintenant accéder aux routes protégées

### 👤 Compte admin par défaut
- **Email:** \`admin@example.com\`
- **Mot de passe:** \`Admin@1234\`

### 🛡️ Rôles
- **admin** : accès complet (lister tous les users, modifier/supprimer n'importe quel user)
- **user** : peut voir et modifier uniquement son propre profil
      `,
    )
    .setVersion('1.0.0')
    .setContact('API Support', 'https://github.com', 'support@example.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez votre token JWT ici',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', 'Endpoints d\'authentification (login, profil)')
    .addTag('Users', 'CRUD complet des utilisateurs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'Users API - Documentation',
    customfavIcon: 'https://nestjs.com/img/logo_text.svg',
    customCss: `
      .swagger-ui .topbar { background: linear-gradient(135deg, #e0234e, #c41539); }
      .swagger-ui .topbar-wrapper img { content: url('https://nestjs.com/img/logo_text.svg'); height: 30px; }
      .swagger-ui .info .title { color: #e0234e; }
      .swagger-ui .scheme-container { background: #f8f9fa; padding: 15px; border-radius: 8px; }
    `,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');

  logger.log(`🚀 Application démarrée sur: http://localhost:${port}/api/v1`);
  logger.log(`📚 Documentation Swagger: http://localhost:${port}/api/docs`);
  logger.log(`🔑 Admin par défaut: admin@example.com / Admin@1234`);
}

bootstrap();
