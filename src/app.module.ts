import { config } from "dotenv";
config();
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ActionHistoryModule } from "./modules/action-history/action-history.module";
import { AuthModule } from "./modules/auth/auth.module";
import { DeviceModule } from "./modules/device/device.module";
import { GardenModule } from "./modules/garden/garden.module";
import { MeasureDataModule } from "./modules/measure-data/measure-data.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    UserModule,
    // GardenModule,
    // DeviceModule,
    // ActionHistoryModule,
    // MeasureDataModule,
    AuthModule,
    MongooseModule.forRoot(process.env.MONGODB_DATABASE_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
