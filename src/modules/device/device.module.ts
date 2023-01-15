import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { DeviceService } from "./device.service";
import { DeviceGardenController } from "./device-garden.controller";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { DeviceCoreModule } from "./device.core.module";
import { UtilModule } from "../utils/util.module";
import { GardenCoreModule } from "../garden/garden.core.module";
import { DeviceController } from "./device.controller";
import { DeviceActionController } from "./device-action.controller";

@Module({
  controllers: [
    DeviceGardenController,
    DeviceController,
    DeviceActionController,
  ],
  providers: [DeviceService],
  imports: [DeviceCoreModule, UtilModule, GardenCoreModule],
})
export class DeviceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        DeviceGardenController,
        DeviceController,
        DeviceActionController
      );
  }
}
