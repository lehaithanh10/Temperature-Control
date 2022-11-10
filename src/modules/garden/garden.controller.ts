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
import { GardenService } from "./garden.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { UpdateGardenDto } from "./dto/update-garden.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  GardenResponseDto,
  GardensResponseDto,
} from "./dto/garden.response.dto";
import { User } from "src/decorators/user.decorator";
import { GardenAccessGuard } from "src/guards/garden.access.guard";

@Controller("garden")
@ApiTags("user.garden")
@ApiBearerAuth()
export class GardenController {
  constructor(private readonly gardenService: GardenService) {}

  @Post()
  @ApiOperation({
    operationId: "UserCreateGarden",
    description: "Operation to create garden",
    summary: "User create garden",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: GardenResponseDto,
  })
  createNewGarden(
    @Body() createGardenDto: CreateGardenDto,
    @User("userId") userId: string
  ) {
    return this.gardenService.createNewGarden(userId, createGardenDto);
  }

  @Get()
  @ApiOperation({
    operationId: "UserReadAllGardenInfo",
    description: "Operation for user to read all garden info",
    summary: "User read all garden info",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GardensResponseDto,
  })
  findAllUserGarden(@User("userId") userId: string) {
    return this.gardenService.findAllUserGarden(userId);
  }

  @Get(":gardenId")
  @ApiOperation({
    operationId: "UserReadGardenInfo",
    description: "Operation for user to read garden info",
    summary: "User read garden info",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GardenResponseDto,
  })
  @UseGuards(GardenAccessGuard)
  findOneGarden(@Param("gardenId") gardenId: string) {
    return this.gardenService.findOneGarden(gardenId);
  }

  @Patch(":gardenId")
  @ApiOperation({
    operationId: "UserUpdateGardenInfo",
    description: "Operation for user to update garden info",
    summary: "User update garden info",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GardenResponseDto,
  })
  @UseGuards(GardenAccessGuard)
  updateGarden(
    @Body() updateGardenDto: UpdateGardenDto,
    @Param("gardenId") gardenId: string
  ) {
    return this.gardenService.updateGarden(gardenId, updateGardenDto);
  }

  @Delete(":gardenId")
  @ApiOperation({
    operationId: "UserRemoveGarden",
    description: "Operation for user to remove garden",
    summary: "User remove garden",
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @UseGuards(GardenAccessGuard)
  remove(@Param("gardenId") gardenId: string) {
    return this.gardenService.removeGarden(gardenId);
  }
}
