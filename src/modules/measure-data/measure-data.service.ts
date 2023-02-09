import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "src/shared/type";
import { DeviceDocument } from "../device/device.model";
import { FilterMeasureDataDto } from "./dto/filter-measure-data.dto";
import { MeasureDataDocument } from "./measure-data.model";

@Injectable()
export class MeasureDataService {
  constructor(
    @InjectModel(ECollectionName.MEASURE_DATA)
    private readonly measureDataModel: Model<MeasureDataDocument>,
    @InjectModel(ECollectionName.DEVICES)
    private readonly deviceModel: Model<DeviceDocument>
  ) {}

  filterGardenMeasureData(filterData: FilterMeasureDataDto) {
    const mongoFilter = {
      createdAt: {
        ...(filterData.from ? { $gte: new Date(filterData.from) } : {}),
        ...(filterData.to ? { $lte: new Date(filterData.to) } : {}),
      },
      gardenId: filterData.gardenId,
    };

    return this.measureDataModel.find(mongoFilter);
  }
}
