import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DeviceService } from "./device.service";
import { DeviceController } from "./device.controller";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { DeviceCoreModule } from "./device.core.module";
import { UtilModule } from "../utils/util.module";
import { GardenCoreModule } from "../garden/garden.core.module";

@Module({
  controllers: [DeviceController],
  providers: [DeviceService],
  imports: [DeviceCoreModule, UtilModule, GardenCoreModule],
})
export class DeviceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(DeviceController);
  }
}
