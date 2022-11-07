import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ActionHistoryService } from "./action-history.service";
import { CreateActionHistoryDto } from "./dto/create-action-history.dto";
import { UpdateActionHistoryDto } from "./dto/update-action-history.dto";

@Controller("action-history")
@ApiTags("user.action-history")
export class ActionHistoryController {
  constructor(private readonly actionHistoryService: ActionHistoryService) {}

  @Post()
  create(@Body() createActionHistoryDto: CreateActionHistoryDto) {
    return this.actionHistoryService.create(createActionHistoryDto);
  }

  @Get()
  findAll() {
    return this.actionHistoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.actionHistoryService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateActionHistoryDto: UpdateActionHistoryDto
  ) {
    return this.actionHistoryService.update(+id, updateActionHistoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.actionHistoryService.remove(+id);
  }
}
