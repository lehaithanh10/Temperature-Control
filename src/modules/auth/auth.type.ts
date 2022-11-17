import { Request } from "express";
import { ERoleName } from "src/shared/type";

export interface IUserDataSignWithJWT {
  userId: string;
  role: ERoleName;
}

export interface IAuthorizedRequest extends Request {
  user: IIamUserData;
}

export interface IIamUserData {
  role: ERoleName;
  id: string;
  username: string;
}
