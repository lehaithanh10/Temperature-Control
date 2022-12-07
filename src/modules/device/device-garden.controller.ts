import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "src/decorators/user.decorator";
import { GardenAccessGuard } from "src/guards/garden.access.guard";
import { DeviceService } from "./device.service";
import { CreateDeviceDto } from "./dto/create-device.dto";
import {
  DeviceResponseDto,
  ListDeviceResponseDto,
} from "./dto/device.response.dto";
import { UpdateDeviceDto } from "./dto/update-device.dto";

@Controller("garden/:gardenId/device")
@ApiTags("garden.device")
@UseGuards(GardenAccessGuard)
@ApiBearerAuth()
export class DeviceGardenController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  @ApiOperation({
    operationId: "UserAddNewDeviceToGarden",
    description: "Operation for user to add new device to garden",
    summary: "User add new device to garden",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DeviceResponseDto,
  })
  addNewDeviceToGarden(
    @Body() createDeviceDto: CreateDeviceDto,
    @Param("gardenId") gardenId: string
  ) {
    return this.deviceService.addNewDeviceToGarden(gardenId, createDeviceDto);
  }

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

  @Get()
  @ApiOperation({
    operationId: "UserGetAllDeviceFromGarden",
    description: "Operation for user to get all device info from garden",
    summary: "User get all device from garden",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ListDeviceResponseDto,
  })
  findAllDeviceFromGarden(@Param("gardenId") gardenId: string) {
    return this.deviceService.findAllDeviceInGarden(gardenId);
  }

  @Get(":deviceId")
  @ApiOperation({
    operationId: "UserGetOneDeviceFromGarden",
    description: "Operation for user to get one device info from garden",
    summary: "User get one device info from garden",
  })
  @ApiParam({
    type: String,
    name: "gardenId",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DeviceResponseDto,
  })
  findOneDevice(@Param("deviceId") deviceId: string) {
    return this.deviceService.findOneDeviceInGarden(deviceId);
  }

  @Patch(":deviceId")
  @ApiOperation({
    operationId: "UserUpdateDeviceInfo",
    description: "Operation for user to update device info",
    summary: "User update device info",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: DeviceResponseDto,
  })
  @ApiParam({
    type: String,
    name: "gardenId",
  })
  updateDevice(
    @Param("deviceId") deviceId: string,
    @Body() updateDeviceDto: UpdateDeviceDto
  ) {
    return this.deviceService.updateDevice(deviceId, updateDeviceDto);
  }

  @Delete(":deviceId")
  @ApiOperation({
    operationId: "UserRemoveDevice",
    description: "Operation for user to remove device",
    summary: "User remove device",
  })
  @ApiParam({
    type: String,
    name: "gardenId",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  remove(@Param("deviceId") deviceId: string) {
    return this.deviceService.removeDevice(deviceId);
  }
}
