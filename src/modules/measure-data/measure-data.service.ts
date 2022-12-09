import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "src/shared/type";
import { CreateMeasureDataDto } from "./dto/create-measure-data.dto";
import { FilterMeasureDataDto } from "./dto/filter-measure-data.dto";
import { UpdateMeasureDatumDto } from "./dto/update-measure-datum.dto";
import { MeasureDataDocument } from "./measure-data.model";

@Injectable()
export class MeasureDataService {
  constructor(
    @InjectModel(ECollectionName.MEASURE_DATA)
    private readonly measureDataModel: Model<MeasureDataDocument>
  ) {}

  pushGardenMeasureData(
    gardenId: string,
    deviceId: string,
    createMeasureDataDto: CreateMeasureDataDto
  ) {
    return this.measureDataModel.create({
      gardenId,
      deviceId,
      ...createMeasureDataDto,
    });
  }

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

  findOne(id: number) {
    return `This action returns a #${id} measureDatum`;
  }

  update(id: number, updateMeasureDatumDto: UpdateMeasureDatumDto) {
    return `This action updates a #${id} measureDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} measureDatum`;
  }
}
