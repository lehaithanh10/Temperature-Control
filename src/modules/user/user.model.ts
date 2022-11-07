import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDocument } from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";
import { ERoleName } from "src/shared/type";

@Schema(DefaultSchemaOptions)
export class UserDocument extends BaseDocument {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, enum: ERoleName })
  role: ERoleName;

  @Prop()
  name?: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  address?: string;
}
