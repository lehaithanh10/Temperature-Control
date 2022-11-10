import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "src/shared/type";
import { DeviceDocument } from "./device.model";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(ECollectionName.DEVICES)
    private readonly deviceModel: Model<DeviceDocument>
  ) {}

  addNewDeviceToGarden(gardenId: string, createDeviceDto: CreateDeviceDto) {
    return this.deviceModel.create({
      gardenId,
      ...createDeviceDto,
    });
  }

  findAllDeviceInGarden(gardenId: string) {
    return this.deviceModel.find({ gardenId });
  }

  findOneDeviceInGarden(deviceId: string) {
    return this.deviceModel.findOne({
      _id: deviceId,
    });
  }

  updateDevice(deviceId: string, updateDeviceDto: UpdateDeviceDto) {
    return this.deviceModel.findOneAndUpdate(
      { _id: deviceId },
      updateDeviceDto,
      { new: true }
    );
  }

  removeDevice(gardenId: string) {
    return this.deviceModel.deleteOne({ _id: gardenId });
  }
}
