import { Module } from "@nestjs/common";
import { MeasureDataService } from "./measure-data.service";
import { MeasureDataController } from "./measure-data.controller";

@Module({
  controllers: [MeasureDataController],
  providers: [MeasureDataService],
})
export class MeasureDataModule {}
