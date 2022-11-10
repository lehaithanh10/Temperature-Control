import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class GardenResponse {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  address?: string;
}

export class GardenResponseDto {
  @ApiProperty({ type: GardenResponse })
  data: GardenResponse;
}

export class GardensResponseDto {
  @ApiProperty({ type: [GardenResponse] })
  data: GardenResponse[];
}
