import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { CreateDeviceDto } from "./create-device.dto";

export class UpdateDeviceDto extends PartialType(CreateDeviceDto) {}

export class ChangeDeviceStatusDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isOn: boolean;
}
