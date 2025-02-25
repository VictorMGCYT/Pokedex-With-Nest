import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Genéra un prefijo para buscar la URL de la API
  app.setGlobalPrefix('api/v2')

  app.useGlobalPipes(
    new ValidationPipe({

      whitelist: true,

      forbidNonWhitelisted: true,

      transformOptions: {
        exposeUnsetFields: false
      }
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
