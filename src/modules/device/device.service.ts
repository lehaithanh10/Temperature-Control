import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  ECollectionName,
  EDeviceType,
  ELightBulbStatus,
  MAX_DEVICE_CAN_CONNECT_ONE_ESP,
} from "src/shared/type";
import { MQTTUtil } from "../utils/mqtt/mqtt.util";
import { MQTTTopic } from "../utils/mqtt/types";
import { DeviceDocument } from "./device.model";
import { CreateDeviceDto } from "./dto/create-device.dto";
import {
  ChangeDeviceStatusDto,
  UpdateDeviceDto,
} from "./dto/update-device.dto";
import * as _ from "lodash";
import { GardenDocument } from "../garden/garden.model";

@Injectable()
export class DeviceService {
  constructor(
    @InjectModel(ECollectionName.DEVICES)
    private readonly deviceModel: Model<DeviceDocument>,
    @InjectModel(ECollectionName.GARDENS)
    private readonly gardenModel: Model<GardenDocument>,
    private readonly mqttUtil: MQTTUtil
  ) {}

  async addNewDeviceToGarden(
    userId: string,
    gardenId: string,
    createDeviceDto: CreateDeviceDto
  ) {
    if (createDeviceDto.type !== EDeviceType.ESP) {
      const espDevices = await this.deviceModel.find({
        gardenId,
        type: EDeviceType.ESP,
      });

      if (_.isEmpty(espDevices)) {
        throw new BadRequestException({
          message:
            "This garden do not have esp. Please contact service provider to set up",
        });
      }

      const garden = await this.gardenModel.findById(gardenId);

      if (
        garden.deviceCount >
          MAX_DEVICE_CAN_CONNECT_ONE_ESP * espDevices.length ||
        garden.deviceCount ===
          MAX_DEVICE_CAN_CONNECT_ONE_ESP * espDevices.length
      ) {
        throw new BadRequestException({
          message:
            "Can not add more device, Please contact your service provider",
        });
      }
    }
    const newDevice = await this.deviceModel.create({
      userId,
      gardenId,
      ...createDeviceDto,
      ...((createDeviceDto.type = EDeviceType.LIGHT_BULB)
        ? { status: ELightBulbStatus.OFF }
        : {}),
    });

    if (newDevice.type !== EDeviceType.ESP) {
      await this.gardenModel.findByIdAndUpdate(gardenId, {
        $inc: { deviceCount: 1 },
      });
    }

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
