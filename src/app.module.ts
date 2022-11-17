import { config } from "dotenv";
config();
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AuthModule } from "./modules/auth/auth.module";
import { DeviceModule } from "./modules/device/device.module";
import { GardenModule } from "./modules/garden/garden.module";
import { MeasureDataModule } from "./modules/measure-data/measure-data.module";
import { UserModule } from "./modules/user/user.module";
import { APP_FILTER } from "@nestjs/core";
import { GeneralExceptionFilter } from "./filters/general-expection.filter";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [
    UserModule,
    GardenModule,
    DeviceModule,
    // ActionModule,
    MeasureDataModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_DATABASE_URL),
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GeneralExceptionFilter,
    },
  ],
})
export class AppModule {}
