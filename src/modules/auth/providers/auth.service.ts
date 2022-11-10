import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName, ERoleName } from "src/shared/type";
import { UserDocument } from "../../user/user.model";
import { UserLoginDto, UserRegisterDto } from "../dto/auth.dto";
import * as bcrypt from "bcrypt";
const jwt = require("jsonwebtoken");

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ECollectionName.USERS)
    private readonly userModel: Model<UserDocument>
  ) {}
  async register(data: UserRegisterDto) {
    if (data.confirmPassword && data.password !== data.confirmPassword) {
      throw new BadRequestException({
        message: "Password and confirm password not match",
      });
    }

    // check user existed
    const user = await this.userModel.findOne({
      role: data.role,
      username: data.username,
    });

    if (user) {
      throw new UnauthorizedException({
        message: "User is already in the system",
      });
    } else {
      const newUser = await this.userModel.create({
        username: data.username,
        role: data.role,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync()),
      });

      return {
        accessToken: this.getToken({
          userId: newUser.id,
          role: newUser.role,
        }),
      };
    }
  }

  async login(data: UserLoginDto) {
    const user = await this.userModel.findOne({
      role: data.role,
      username: data.username,
    });

    if (!user) {
      throw new NotFoundException({
        data: {
          message: "User was not existed in system",
        },
      });
    }

    if (bcrypt.compareSync(data.password, user.password)) {
      return {
        accessToken: this.getToken({
          userId: user.id,
          role: user.role,
        }),
      };
    } else {
      throw new UnauthorizedException({
        message: "Password wrong",
      });
    }
  }

  getToken({ userId, role }: { role: ERoleName; userId: string }) {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return token;
  }

  async logout() {
    return;
  }
}
