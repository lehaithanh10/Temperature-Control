import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ECollectionName } from "src/shared/type";
import { AuthUserDocument } from "./auth-user.model";

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.AUTH_USER,
        schema: AuthUserDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.AUTH_USER,
        schema: AuthUserDocument.schema,
      },
    ]),
  ],
})
export class AuthUserCoreModule {}
