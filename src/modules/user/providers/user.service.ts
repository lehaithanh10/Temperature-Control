import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "src/shared/type";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserDocument } from "../user.model";
import * as _ from "lodash";
@Injectable()
export class UserService {
  constructor(
    @InjectModel(ECollectionName.USERS)
    private readonly userModel: Model<UserDocument>
  ) {}

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findOneAndUpdate(
      { _id: userId },
      updateUserDto,
      { new: true }
    );

    return _.omit({ ...user.toJSON() }, ["password"]);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
