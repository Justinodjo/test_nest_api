'use strict';

require('reflect-metadata');

const { NestFactory } = require('@nestjs/core');
const { ValidationPipe, Logger } = require('@nestjs/common');
const { SwaggerModule, DocumentBuilder } = require('@nestjs/swagger');
const { AppModule } = require('./app.module');
const { HttpExceptionFilter } = require('./common/filters/http-exception.filter');

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // ─── Prefix global ─────────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ─── CORS ──────────────────────────────────────────────────────────────────
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ─── Validation globale ────────────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      stopAtFirstError: false,
    }),
  );

  // ─── Filtre global d'exceptions ────────────────────────────────────────────
  app.useGlobalFilters(new HttpExceptionFilter());

  // ─── Swagger ───────────────────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription(
      `## API de gestion des utilisateurs avec authentification JWT

### 🔐 Comment utiliser
1. **Inscrivez-vous** via \`POST /users/register\`
2. **Connectez-vous** via \`POST /auth/login\` pour obtenir un token JWT
3. Cliquez sur **Authorize** 🔒 et entrez : \`Bearer <votre_token>\`
4. Accédez aux routes protégées

### 👤 Compte admin par défaut
- **Email:** \`admin@example.com\`
- **Mot de passe:** \`Admin@1234\`

### 🛡️ Rôles
- **admin** : accès complet (tous les users, modifier/supprimer n'importe qui)
- **user** : accès à son propre profil uniquement
      `,
    )
    .setVersion('1.0.0')
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
    .addTag('Auth', "Endpoints d'authentification")
    .addTag('Users', 'CRUD complet des utilisateurs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'Users API - Documentation',
    customCss: `
      .swagger-ui .topbar { background: linear-gradient(135deg, #e0234e, #c41539); }
      .swagger-ui .info .title { color: #e0234e; }
    `,
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`🚀 Serveur démarré sur : http://localhost:${port}/api/v1`);
  logger.log(`📚 Swagger UI         : http://localhost:${port}/api/docs`);
  logger.log(`🔑 Admin par défaut   : admin@example.com / Admin@1234`);
}

bootstrap();
