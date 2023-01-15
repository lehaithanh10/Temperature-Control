import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeviceDocument } from "src/modules/device/device.model";
import { CreateMeasureDataDto } from "src/modules/measure-data/dto/create-measure-data.dto";
import { MeasureDataDocument } from "src/modules/measure-data/measure-data.model";
import { ECollectionName } from "../../shared/type";

@Injectable()
export class MeasureDataUtil {
  constructor(
    @InjectModel(ECollectionName.MEASURE_DATA)
    private readonly measureDataModel: Model<MeasureDataDocument>,
    @InjectModel(ECollectionName.DEVICES)
    private readonly deviceModel: Model<DeviceDocument>
  ) {}

  async pushGardenMeasureData(
    deviceId: string,
    createMeasureDataDto: CreateMeasureDataDto
  ) {
    const device = await this.deviceModel.findById(deviceId);

    return this.measureDataModel.create({
      deviceId,
      gardenId: device.gardenId,
      ...createMeasureDataDto,
    });
  }
}
