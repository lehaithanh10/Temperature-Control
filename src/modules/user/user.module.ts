import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { UtilModule } from "../utils/util.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./providers/user.service";
import { UserCoreModule } from "./user.core.module";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [UtilModule, UserCoreModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
