import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { EDeviceType } from "src/shared/type";

export class CreateDeviceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    enum: EDeviceType,
    type: "string",
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(EDeviceType)
  type: EDeviceType;
}
