import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class DeviceResponse {
  @ApiProperty()
  gardenId: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  status?: string;

  @ApiProperty()
  userId?: string;
}

export class DeviceResponseDto {
  @ApiProperty({ type: DeviceResponse })
  data: DeviceResponse;
}

export class ListDeviceResponseDto {
  @ApiProperty({ type: [DeviceResponse] })
  data: DeviceResponse[];
}
