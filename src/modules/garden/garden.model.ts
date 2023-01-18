import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDocument } from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";

@Schema(DefaultSchemaOptions)
export class GardenDocument extends BaseDocument {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  address?: string;

  @Prop({ required: true, default: 0 })
  deviceCount: number; // sensor, light bulb
}
