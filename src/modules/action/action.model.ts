import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDocument } from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";

@Schema(DefaultSchemaOptions)
export class ActionDocument extends BaseDocument {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  deviceId?: string;
}
