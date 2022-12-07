import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDocument } from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";
import { EDeviceType } from "src/shared/type";

@Schema(DefaultSchemaOptions)
export class DeviceDocument extends BaseDocument {
  @Prop({ required: true })
  gardenId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  description?: string;

  @Prop()
  status?: string;

  @Prop({ required: true, enum: EDeviceType })
  type: EDeviceType;
}
