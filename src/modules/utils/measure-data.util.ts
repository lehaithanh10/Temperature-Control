import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeviceDocument } from "src/modules/device/device.model";
import { CreateMeasureDataDto } from "src/modules/measure-data/dto/create-measure-data.dto";
import { MeasureDataDocument } from "src/modules/measure-data/measure-data.model";
import {
  executeWarningType,
  INotificationType,
  isWaringThreshold,
} from "src/shared/waringHelpers";
import { ECollectionName } from "../../shared/type";
import { MQTTUtil } from "./mqtt/mqtt.util";
import { MQTTTopic } from "./mqtt/types";

@Injectable()
export class MeasureDataUtil {
  constructor(
    @InjectModel(ECollectionName.MEASURE_DATA)
    private readonly measureDataModel: Model<MeasureDataDocument>,
    @InjectModel(ECollectionName.DEVICES)
    private readonly deviceModel: Model<DeviceDocument>,
    private readonly mqttUtil: MQTTUtil
  ) {}

  async pushGardenMeasureData(
    deviceId: string,
    createMeasureDataDto: CreateMeasureDataDto
  ) {
    const device = await this.deviceModel.findById(deviceId);

    let notificationData = {} as INotificationType;

    if (isWaringThreshold(createMeasureDataDto)) {
      notificationData = {
        ...executeWarningType(createMeasureDataDto),
        gardenId: device.gardenId,
      };

      this.mqttUtil.publish(
        notificationData,
        `${MQTTTopic.WARNING_USER}/${device.userId}`
      );
    }

    return this.measureDataModel.create({
      deviceId,
      gardenId: device.gardenId,
      ...createMeasureDataDto,
    });
  }
}
