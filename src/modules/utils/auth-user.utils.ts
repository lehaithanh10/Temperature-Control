import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDocument } from "../user/user.model";
import { ECollectionName } from "src/shared/type";
import { IUserDataSignWithJWT } from "../auth/auth.type";
const jwt = require("jsonwebtoken");

@Injectable()
export class AuthUserUtil {
  constructor(
    @InjectModel(ECollectionName.USERS)
    private readonly userModel: Model<UserDocument>
  ) {}

  async getUserInfoFromAccessToken(accessToken: string) {
    const data: IUserDataSignWithJWT = jwt.verify(
      accessToken,
      process.env.JWT_SECRET
    );

    return this.userModel.findOne({
      _id: data.userId,
      role: data.role,
    });
  }
}
