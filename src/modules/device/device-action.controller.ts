import {
  Body,
  Controller,
  HttpStatus,
  Put,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DeviceContext } from "src/decorators/device-context.decorator";
import { DeviceAccessGuard } from "src/guards/device.access.guard";
import { InjectDeviceContextInterceptor } from "src/interceptors/device/inject-device-context.interceptor";
import { DeviceService } from "./device.service";
import { ChangeDeviceStatusDto } from "./dto/update-device.dto";

@Controller("/device/action")
@ApiTags("device.action")
@ApiBearerAuth()
export class DeviceActionController {
  constructor(private readonly deviceService: DeviceService) {}

  @Put(":deviceId")
  @ApiOperation({
    operationId: "UserGetControlLightBulbDevice",
    description: "Operation for user to change device status",
    summary: "User control light bulb device",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiParam({
    name: "deviceId",
    type: String,
  })
  @UseInterceptors(InjectDeviceContextInterceptor)
  @UseGuards(DeviceAccessGuard)
  changeDeviceStatus(
    @DeviceContext("deviceId") deviceId: string,
    @Body() changeDeviceStatusDto: ChangeDeviceStatusDto
  ) {
    return this.deviceService.changeDeviceStatus(
      deviceId,
      changeDeviceStatusDto
    );
  }
}
