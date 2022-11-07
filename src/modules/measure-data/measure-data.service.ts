import { Injectable } from "@nestjs/common";
import { CreateMeasureDatumDto } from "./dto/create-measure-datum.dto";
import { UpdateMeasureDatumDto } from "./dto/update-measure-datum.dto";

@Injectable()
export class MeasureDataService {
  create(createMeasureDatumDto: CreateMeasureDatumDto) {
    return "This action adds a new measureDatum";
  }

  findAll() {
    return `This action returns all measureData`;
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
