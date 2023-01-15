import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IAuthorizedRequest } from "src/modules/auth/auth.type";
import { DeviceDocument } from "src/modules/device/device.model";
import {} from "src/modules/garden/garden.model";
import { ECollectionName } from "src/shared/type";

@Injectable()
export class InjectDeviceContextInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(ECollectionName.DEVICES)
    private readonly deviceModel: Model<DeviceDocument>
  ) {}
  async intercept(ctx: ExecutionContext, call$: CallHandler) {
    const request = ctx.switchToHttp().getRequest<IAuthorizedRequest>();

    let device: DeviceDocument | null = null;

    if (request.params?.deviceId) {
      device = await this.deviceModel.findById(request.params?.deviceId);
    }

    request["device"] = device?.toJSON();
    return call$.handle();
  }
}
