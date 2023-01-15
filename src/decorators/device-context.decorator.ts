import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const DeviceContext = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    switch (data) {
      case "deviceId":
        return req.device.id;
      default:
        return req.device;
    }
  }
);
