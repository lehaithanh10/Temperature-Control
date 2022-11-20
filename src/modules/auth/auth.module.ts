import { Module } from "@nestjs/common";
import { AuthService } from "./providers/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { UserCoreModule } from "../user/user.core.module";
import { AuthUserCoreModule } from "./auth-user.core.module";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserCoreModule, AuthUserCoreModule],
})
export class AuthModule {}
