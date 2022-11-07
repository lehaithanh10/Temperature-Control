import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { GardenService } from "./garden.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { UpdateGardenDto } from "./dto/update-garden.dto";
import { ApiTags } from "@nestjs/swagger";

@Controller("garden")
@ApiTags("user.garden")
export class GardenController {
  constructor(private readonly gardenService: GardenService) {}

  @Post()
  create(@Body() createGardenDto: CreateGardenDto) {
    return this.gardenService.create(createGardenDto);
  }

  @Get()
  findAll() {
    return this.gardenService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.gardenService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateGardenDto: UpdateGardenDto) {
    return this.gardenService.update(+id, updateGardenDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.gardenService.remove(+id);
  }
}
