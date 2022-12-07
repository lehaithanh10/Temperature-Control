import { Controller, Get, HttpStatus, UseGuards } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "src/decorators/user.decorator";
import { DeviceService } from "./device.service";
import { ListDeviceResponseDto } from "./dto/device.response.dto";

@Controller("/device")
@ApiTags("user.device")
@ApiBearerAuth()
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Get()
  @ApiOperation({
    operationId: "UserGetAllDevice",
    description: "Operation for user to get all device info",
    summary: "User get all device",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListDeviceResponseDto,
  })
  findAllDeviceOfUser(@User("userId") userId: string) {
    return this.deviceService.findAllDeviceOfUser(userId);
  }
}
