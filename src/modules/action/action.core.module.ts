import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ECollectionName } from "src/shared/type";
import { ActionDocument } from "./action.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.ACTION,
        schema: ActionDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.ACTION,
        schema: ActionDocument.schema,
      },
    ]),
  ],
})
export class DeviceCoreModule {}
