import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { UtilModule } from "../utils/util.module";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./providers/user.service";

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [UtilModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserController);
  }
}
