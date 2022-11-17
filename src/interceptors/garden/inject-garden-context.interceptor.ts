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
import { GardenDocument } from "src/modules/garden/garden.model";
import { ECollectionName, ERoleName } from "src/shared/type";

@Injectable()
export class InjectGardenContextInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(ECollectionName.GARDENS)
    private readonly gardenModel: Model<GardenDocument>,
    @InjectModel(ECollectionName.DEVICES)
    private readonly deviceModel: Model<DeviceDocument>
  ) {}
  async intercept(ctx: ExecutionContext, call$: CallHandler) {
    const request = ctx.switchToHttp().getRequest<IAuthorizedRequest>();

    let garden: GardenDocument | null = null;

    if (request.user && request.user.role === ERoleName.USERS) {
      garden = await this.gardenModel.findOne({ userId: request.user.id });
    }

    if (request.params?.gardenId || request.params?.deviceId) {
      garden = !!request.params?.gardenId
        ? await this.gardenModel.findById(request.params.gardenId)
        : await (async () => {
            const device = await this.deviceModel.findById(
              request.params.deviceId
            );
            return this.gardenModel.findById(device.gardenId);
          })();
    }

    request["garden"] = garden?.toJSON();
    return call$.handle();
  }
}
