import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  const allowedOrigins = process.env.CORS_ORIGINS?.split(',');

  app.enableCors({
    origin: (origin, callback) => {
      // Permitir requests sin origin (Postman, SSR, cron)
      if (!origin) return callback(null, true);

      if (allowedOrigins?.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS bloqueado para: ${origin}`), false);
    },
  });


  // Global prefix for all routes
  app.setGlobalPrefix('api');

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Interactive CV Platform API')
    .setDescription('API for managing CV content with CRUD operations')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('profile', 'Profile management')
    .addTag('experience', 'Work experience management')
    .addTag('projects', 'Projects portfolio management')
    .addTag('skills', 'Skills management')
    .addTag('tech-stack', 'Technology stack management')
    .addTag('references', 'Professional references management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`
    🚀 Application is running on: http://localhost:${port}
    📚 Swagger documentation: http://localhost:${port}/api/docs
  `);
}

bootstrap();