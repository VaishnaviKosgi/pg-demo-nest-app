import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserSeeder } from './seeders/user.seeder';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('PG Demo Application')
  .setDescription('API documentation for the PG Demo application')
  .setVersion('1.0')
  .addBearerAuth() 
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const userSeeder = app.get(UserSeeder);
  await userSeeder.seed();

  await app.listen(3000);
}
bootstrap();
