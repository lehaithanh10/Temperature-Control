import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ECollectionName } from "src/shared/type";
import { MeasureDataDocument } from "./measure-data.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.MEASURE_DATA,
        schema: MeasureDataDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.MEASURE_DATA,
        schema: MeasureDataDocument.schema,
      },
    ]),
  ],
})
export class MeasureDataCoreModule {}
