import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT;
  const app = await NestFactory.create(AppModule);

  //создаем объект для ведения документации в сваггере
  const config = new DocumentBuilder()
    .setTitle('nest lessons')
    .setDescription('documentation rest api')
    .setVersion('1.0.0')
    .addTag('Misha')
    .build();

  //непосредственно создаем документ свагера
  const document = SwaggerModule.createDocument(app, config);
  
  //настройка, показывающая путь до нашего сваггера
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log('server started on ' + PORT));
}

start();
