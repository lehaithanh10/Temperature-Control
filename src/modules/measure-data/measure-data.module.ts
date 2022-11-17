import { Module } from "@nestjs/common";
import { MeasureDataService } from "./measure-data.service";
import { MeasureDataController } from "./measure-data.controller";
import { MeasureDataCoreModule } from "./measure-data.core.module";
import { GardenCoreModule } from "../garden/garden.core.module";
import { DeviceCoreModule } from "../device/device.core.module";

@Module({
  controllers: [MeasureDataController],
  providers: [MeasureDataService],
  imports: [MeasureDataCoreModule, GardenCoreModule, DeviceCoreModule],
})
export class MeasureDataModule {}
