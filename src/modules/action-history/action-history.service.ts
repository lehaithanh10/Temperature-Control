import { Injectable } from "@nestjs/common";
import { CreateActionHistoryDto } from "./dto/create-action-history.dto";
import { UpdateActionHistoryDto } from "./dto/update-action-history.dto";

@Injectable()
export class ActionHistoryService {
  create(createActionHistoryDto: CreateActionHistoryDto) {
    return "This action adds a new actionHistory";
  }

  findAll() {
    return `This action returns all actionHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} actionHistory`;
  }

  update(id: number, updateActionHistoryDto: UpdateActionHistoryDto) {
    return `This action updates a #${id} actionHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} actionHistory`;
  }
}
