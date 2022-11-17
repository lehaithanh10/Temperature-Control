import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateMeasureDataDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  moisture: number;
}
