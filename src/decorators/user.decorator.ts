import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  switch (data) {
    case "userId":
      return req.user.id;
    default:
      return req.user;
  }
});
