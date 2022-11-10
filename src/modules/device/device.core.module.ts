import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ECollectionName } from "src/shared/type";
import { DeviceDocument } from "./device.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.DEVICES,
        schema: DeviceDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.DEVICES,
        schema: DeviceDocument.schema,
      },
    ]),
  ],
})
export class DeviceCoreModule {}
