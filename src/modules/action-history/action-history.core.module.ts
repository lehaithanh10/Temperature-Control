import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ECollectionName } from "src/shared/type";
import { ActionHistoryDocument } from "./action-history.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.ACTION_HISTORY,
        schema: ActionHistoryDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.ACTION_HISTORY,
        schema: ActionHistoryDocument.schema,
      },
    ]),
  ],
})
export class DeviceCoreModule {}
