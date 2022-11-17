import { ApiProperty } from "@nestjs/swagger";

export class MeasureDataResponse {
  @ApiProperty()
  deviceId: string;

  @ApiProperty()
  gardenId: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  temperature: number;

  @ApiProperty()
  moisture: number;
}

export class MeasureDataResponseDto {
  @ApiProperty({ type: MeasureDataResponse })
  data: MeasureDataResponse;
}

export class ListMeasureDataResponseDto {
  @ApiProperty({ type: [MeasureDataResponse] })
  data: MeasureDataResponse[];
}
