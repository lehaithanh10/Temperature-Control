import { Module } from "@nestjs/common";
import { UserCoreModule } from "../user/user.core.module";
import { AuthUserUtil } from "./auth-user.utils";

@Module({
  imports: [UserCoreModule],
  providers: [AuthUserUtil],
  exports: [AuthUserUtil],
})
export class UtilModule {}
