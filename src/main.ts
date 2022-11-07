import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  console.log(process.env.MONGODB_DATABASE_URL);
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  app.setGlobalPrefix(process.env.APP_BASE_URL);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle("Temperature Control API")
    .setDescription("The Temperature Control API description")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/docs", app, document, {
    swaggerOptions: {
      displayOperationId: true,
      persistAuthorization: true,
    },
    customSiteTitle: "Temperature Control service",
  });
  await app.listen(process.env.PORT || 3003);
}

bootstrap()
  .then(() => {
    console.info(
      `App is running on port ${process.env.PORT} with baseURL=${process.env.APP_BASE_URL}`
    );
    console.info(
      `App swagger document is running on port ${
        process.env.PORT || 3003
      } with baseURL=${process.env.DOC_BASE_URL}`
    );
  })
  .catch((e) => {
    console.error(e);
    console.info(`App exiting....`);
    process.exit(-1);
  });
