import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'hbs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );
  app.use(bodyParser.json()); // добавляем middleware

  app.useStaticAssets(join(__dirname, '..', 'public'));
  console.log('Static assets path:', 'public');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  hbs.registerPartials(join(__dirname, '..', '/views/partials'));

  const config = new DocumentBuilder()
    .setTitle('Бронирование фото-услуг')
    .setDescription('Описание API сайта')
    .setVersion('1.0')
    .addTag('user')
    .addTag('service')
    .addTag('cart')
    .addTag('booking')
    .addTag('comment')
    // .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  if (typeof process.env.PORT === 'undefined') {
    await app.listen(3000);
  } else {
    await app.listen(process.env.PORT);
  }
}
bootstrap();