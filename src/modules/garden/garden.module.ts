import { Module } from "@nestjs/common";
import { GardenService } from "./garden.service";
import { GardenController } from "./garden.controller";
import { GardenCoreModule } from "./garden.core.module";

@Module({
  controllers: [GardenController],
  providers: [GardenService],
  imports: [GardenCoreModule],
})
export class GardenModule {}
