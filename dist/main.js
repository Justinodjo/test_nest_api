"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.enableCors({
        origin: process.env.CORS_ORIGIN || '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        stopAtFirstError: false,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Users API')
        .setDescription(`## API de gestion des utilisateurs avec authentification JWT

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
      `)
        .setVersion('1.0.0')
        .setContact('API Support', 'https://github.com', 'support@example.com')
        .setLicense('MIT', 'https://opensource.org/licenses/MIT')
        .addBearerAuth({
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez votre token JWT ici',
        in: 'header',
    }, 'JWT-auth')
        .addTag('Auth', 'Endpoints d\'authentification (login, profil)')
        .addTag('Users', 'CRUD complet des utilisateurs')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
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
    await app.listen(port);
    logger.log(`🚀 Application démarrée sur: http://localhost:${port}/api/v1`);
    logger.log(`📚 Documentation Swagger: http://localhost:${port}/api/docs`);
    logger.log(`🔑 Admin par défaut: admin@example.com / Admin@1234`);
}
bootstrap();
//# sourceMappingURL=main.js.map