import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeviceDocument } from "src/modules/device/device.model";
import { ECollectionName } from "src/shared/type";

@Injectable()
export class DeviceAccessGuard implements CanActivate {
  constructor(
    @InjectModel(ECollectionName.DEVICES)
    private readonly deviceModel: Model<DeviceDocument>
  ) {}
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const userId = req.user.id;
    const deviceId = req.params.deviceId;
    const deviceInfo = await this.deviceModel.findById(deviceId);
    if (!deviceInfo || String(deviceInfo.userId) !== userId) {
      throw new ForbiddenException("Can not access the device");
    }
    return true;
  }
}
