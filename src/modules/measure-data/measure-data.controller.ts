import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { MeasureDataService } from "./measure-data.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ListMeasureDataResponseDto } from "./dto/measure-data.response.dto";
import { FilterMeasureDataDto } from "./dto/filter-measure-data.dto";

@Controller("measure-data")
@ApiTags("garden.measure-data")
export class MeasureDataController {
  constructor(private readonly measureDataService: MeasureDataService) {}

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
