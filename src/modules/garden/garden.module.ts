import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { GardenService } from "./garden.service";
import { GardenController } from "./garden.controller";
import { GardenCoreModule } from "./garden.core.module";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { UtilModule } from "../utils/util.module";

@Module({
  controllers: [GardenController],
  providers: [GardenService],
  imports: [GardenCoreModule, UtilModule],
})
export class GardenModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(GardenController);
  }
}
