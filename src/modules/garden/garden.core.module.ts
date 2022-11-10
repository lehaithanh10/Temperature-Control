import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ECollectionName } from "src/shared/type";
import { GardenDocument } from "./garden.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.GARDENS,
        schema: GardenDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.GARDENS,
        schema: GardenDocument.schema,
      },
    ]),
  ],
})
export class GardenCoreModule {}
