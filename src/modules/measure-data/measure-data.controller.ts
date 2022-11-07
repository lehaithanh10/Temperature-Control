import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MeasureDataService } from "./measure-data.service";
import { CreateMeasureDatumDto } from "./dto/create-measure-datum.dto";
import { UpdateMeasureDatumDto } from "./dto/update-measure-datum.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("measure-data")
@ApiTags("user.measure-data")
export class MeasureDataController {
  constructor(private readonly measureDataService: MeasureDataService) {}

  @Post()
  create(@Body() createMeasureDatumDto: CreateMeasureDatumDto) {
    return this.measureDataService.create(createMeasureDatumDto);
  }

  @Get()
  findAll() {
    return this.measureDataService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.measureDataService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateMeasureDatumDto: UpdateMeasureDatumDto
  ) {
    return this.measureDataService.update(+id, updateMeasureDatumDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.measureDataService.remove(+id);
  }
}
