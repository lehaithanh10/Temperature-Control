import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from "class-validator";

export class FilterMeasureDataDto {
  @ApiPropertyOptional({ type: Date, example: "2021-06-10T03:40:37Z" })
  @IsOptional()
  @IsDateString()
  from: Date;

  @ApiPropertyOptional({ type: Date, example: "2021-06-10T03:40:37Z" })
  @IsOptional()
  @IsDateString()
  to: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  gardenId: string;
}
