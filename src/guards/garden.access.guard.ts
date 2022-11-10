import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { GardenDocument } from "src/modules/garden/garden.model";
import { ECollectionName } from "src/shared/type";

@Injectable()
export class GardenAccessGuard implements CanActivate {
  constructor(
    @InjectModel(ECollectionName.GARDENS)
    private readonly gardenModel: Model<GardenDocument>
  ) {}
  async canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest();
    const userId = req.user.id;
    const gardenId = req.params.gardenId;
    const userGarden = await this.gardenModel.findOne({ userId });
    if (!userGarden || String(userGarden.id) !== gardenId) {
      throw new ForbiddenException("Cannot access the garden");
    }
    return true;
  }
}
