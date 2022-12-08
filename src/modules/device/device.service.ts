import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ECollectionName,
  EDeviceType,
  ELightBulbStatus,
} from "src/shared/type";
import { DeviceDocument } from "./device.model";
import { CreateDeviceDto } from "./dto/create-device.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(ECollectionName.DEVICES)
    private readonly deviceModel: Model<DeviceDocument>
  ) {}

  addNewDeviceToGarden(
    userId: string,
    gardenId: string,
    createDeviceDto: CreateDeviceDto
  ) {
    return this.deviceModel.create({
      userId,
      gardenId,
      ...createDeviceDto,
      ...((createDeviceDto.type = EDeviceType.LIGHT_BULB)
        ? { status: ELightBulbStatus.OFF }
        : {}),
    });
  }

  findAllDeviceInGarden(gardenId: string) {
    return this.deviceModel.find({ gardenId });
  }

  findAllDeviceOfUser(userId: string) {
    return this.deviceModel.find({ userId });
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
