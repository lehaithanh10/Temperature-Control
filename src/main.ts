import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";
import { InjectDataFieldToResponseInterceptor } from "./interceptors/inject-data-field-to-response.interceptor";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: console,
  });

  app.setGlobalPrefix(process.env.APP_BASE_URL);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new InjectDataFieldToResponseInterceptor());

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

  const mqttApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.MQTT,
      options: {
        url: "mqtt://broker.hivemq.com:1883",
      },
    }
  );

  await mqttApp.listen();
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
    console.info("MQTT client connected");
  })
  .catch((e) => {
    console.error(e);
    console.info(`App exiting....`);
    process.exit(-1);
  });
