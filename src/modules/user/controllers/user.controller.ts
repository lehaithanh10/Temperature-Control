import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  HttpStatus,
  UseInterceptors,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "src/decorators/user.decorator";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserResponse, UserResponseDto } from "../dto/user.response.dto";
import { UserService } from "../providers/user.service";
import { RolesGuard } from "../../../guards/role.guard";
import { Roles } from "src/decorators/role.decorator";
import { ERoleName } from "src/shared/type";
import { CheckUserIdAndUserFromTokenInterceptor } from "src/interceptors/user/check-userId-and-token.interceptor";
import { InjectDataFieldToResponseInterceptor } from "src/interceptors/inject-data-field-to-response.interceptor";
@Controller("user")
@ApiTags("user.info")
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(ERoleName.USERS)
  @Get("user-info")
  @ApiOperation({
    operationId: "getUserInfo",
    description: "Operation to get user info",
    summary: "Get user info",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  getUserFromAccessToken(@User() user: UserResponse) {
    return user;
  }

  @Roles(ERoleName.USERS)
  @Patch(":userId")
  @ApiOperation({
    operationId: "UpdateUserInfo",
    description: "Operation to update user info",
    summary: "Update user info",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  @UseInterceptors(CheckUserIdAndUserFromTokenInterceptor)
  updateUser(
    @Param("userId") userId: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(userId, updateUserDto);
  }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.userService.remove(+id);
  // }
}
