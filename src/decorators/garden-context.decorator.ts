import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const GardenContext = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    switch (data) {
      case "gardenId":
        return req.garden.id;
      default:
        return req.user;
    }
  }
);
