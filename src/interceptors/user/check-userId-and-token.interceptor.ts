import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from "@nestjs/common";
import { ERoleName } from "src/shared/type";

@Injectable()
export class CheckUserIdAndUserFromTokenInterceptor implements NestInterceptor {
  async intercept(ctx: ExecutionContext, call$: CallHandler) {
    const request = ctx.switchToHttp().getRequest();
    if (request.user && request.user.role === ERoleName.USERS) {
      if (
        request.params?.userId &&
        request.user.id !== request.params?.userId
      ) {
        throw new UnauthorizedException({
          message: "Invalid access token or userId",
        });
      }
    }

    return call$.handle();
  }
}
