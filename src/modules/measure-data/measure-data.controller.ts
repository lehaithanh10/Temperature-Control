import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { MeasureDataService } from "./measure-data.service";
import { CreateMeasureDataDto } from "./dto/create-measure-data.dto";
import { UpdateMeasureDatumDto } from "./dto/update-measure-datum.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListMeasureDataResponseDto } from "./dto/measure-data.response.dto";
import { FilterMeasureDataDto } from "./dto/filter-measure-data.dto";
import { InjectGardenContextInterceptor } from "src/interceptors/garden/inject-garden-context.interceptor";
import { GardenContext } from "src/decorators/garden-context.decorator";

@Controller("measure-data")
@ApiTags("garden.measure-data")
export class MeasureDataController {
  constructor(private readonly measureDataService: MeasureDataService) {}

  @Post(":deviceId")
  @ApiOperation({
    operationId: "pushGardenMeasureData",
    description: "Operation to push garden measure data",
    summary: "Push garden measure data",
  })
  @UseInterceptors(InjectGardenContextInterceptor)
  pushGardenMeasureData(
    @Param("deviceId") deviceId: string,
    @Body() createMeasureDataDto: CreateMeasureDataDto,
    @GardenContext("gardenId") gardenId: string
  ) {
    return this.measureDataService.pushGardenMeasureData(
      gardenId,
      deviceId,
      createMeasureDataDto
    );
  }

  @Get()
  @ApiOperation({
    operationId: "getGardenMeasureData",
    description: "Operation to get garden measure data",
    summary: "Get garden measure data",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListMeasureDataResponseDto,
  })
  filterGardenData(@Query() measureDataFilter: FilterMeasureDataDto) {
    return this.measureDataService.filterGardenMeasureData(measureDataFilter);
  }
}
