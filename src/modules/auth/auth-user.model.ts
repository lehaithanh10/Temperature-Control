import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDocument } from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";

@Schema(DefaultSchemaOptions)
export class AuthUserDocument extends BaseDocument {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop()
  sessionId?: string;
}
