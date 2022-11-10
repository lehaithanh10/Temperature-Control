import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "src/shared/type";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { UpdateGardenDto } from "./dto/update-garden.dto";
import { GardenDocument } from "./garden.model";

@Injectable()
export class GardenService {
  constructor(
    @InjectModel(ECollectionName.GARDENS)
    private readonly gardenModel: Model<GardenDocument>
  ) {}

  createNewGarden(userId: string, createGardenDto: CreateGardenDto) {
    return this.gardenModel.create({
      userId,
      name: createGardenDto.name,
      address: createGardenDto.address,
    });
  }

  findAllUserGarden(userId: string) {
    return this.gardenModel.find({
      userId,
    });
  }

  findOneGarden(gardenId: string) {
    return this.gardenModel.findOne({
      _id: gardenId,
    });
  }

  updateGarden(gardenId: string, updateGardenDto: UpdateGardenDto) {
    return this.gardenModel.findOneAndUpdate(
      { _id: gardenId },
      updateGardenDto,
      { new: true }
    );
  }

  removeGarden(gardenId: string) {
    return this.gardenModel.deleteOne({ _id: gardenId });
  }
}
