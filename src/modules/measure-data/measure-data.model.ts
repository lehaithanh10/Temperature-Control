import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDocument } from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";

@Schema(DefaultSchemaOptions)
export class MeasureDataDocument extends BaseDocument {
  @Prop({ required: true })
  deviceId: string;

  @Prop({ required: true })
  gardenId: string;

  @Prop({ required: true })
  temperature: number;

  @Prop({ required: true })
  moisture: number;
}
