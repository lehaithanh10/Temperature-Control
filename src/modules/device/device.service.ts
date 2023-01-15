import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ECollectionName,
  EDeviceType,
  ELightBulbStatus,
} from "src/shared/type";
import { MQTTUtil } from "../utils/mqtt/mqtt.util";
import { MQTTTopic } from "../utils/mqtt/types";
import { DeviceDocument } from "./device.model";
import { CreateDeviceDto } from "./dto/create-device.dto";
import {
  ChangeDeviceStatusDto,
  UpdateDeviceDto,
} from "./dto/update-device.dto";

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(ECollectionName.DEVICES)
    private readonly deviceModel: Model<DeviceDocument>,
    private readonly mqttUtil: MQTTUtil
  ) {}

  async addNewDeviceToGarden(
    userId: string,
    gardenId: string,
    createDeviceDto: CreateDeviceDto
  ) {
    const newDevice = await this.deviceModel.create({
      userId,
      gardenId,
      ...createDeviceDto,
      ...((createDeviceDto.type = EDeviceType.LIGHT_BULB)
        ? { status: ELightBulbStatus.OFF }
        : {}),
    });

    this.mqttUtil.publish({ deviceId: newDevice.id }, MQTTTopic.NEW_DEVICE);

    return newDevice;
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

  async changeDeviceStatus(
    deviceId: string,
    changeDeviceStatusDto: ChangeDeviceStatusDto
  ) {
    const device = await this.deviceModel.findById(deviceId);

    if (device.type !== EDeviceType.LIGHT_BULB) {
      throw new BadRequestException({
        message: "Can not change status of device, which is not light bulb",
      });
    }

    if (
      (device.status === ELightBulbStatus.ON && changeDeviceStatusDto.isOn) ||
      (device.status === ELightBulbStatus.OFF && !changeDeviceStatusDto.isOn)
    ) {
      throw new BadRequestException({
        message: `Device was ${device.status}, do not need to turn ${device.status}`,
      });
    }

    this.mqttUtil.publish(
      changeDeviceStatusDto,
      `${MQTTTopic.LIGHT_BULB_ACTION}/${device.id}`
    );

    return this.deviceModel.findByIdAndUpdate(deviceId, {
      status: changeDeviceStatusDto.isOn
        ? ELightBulbStatus.ON
        : ELightBulbStatus.OFF,
    });
  }
}
