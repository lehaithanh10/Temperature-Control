import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { User } from "src/decorators/user.decorator";
import { InjectDataFieldToResponseInterceptor } from "src/interceptors/inject-data-field-to-response.interceptor";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserResponseDto } from "../dto/user.response.dto";
import { UserService } from "../providers/user.service";

@Controller("user")
@ApiTags("user.info")
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}
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
  @UseInterceptors(InjectDataFieldToResponseInterceptor)
  getUserFromAccessToken(@User() user: UserResponseDto) {
    return user;
  }

  // @Get(":id")
  // findOne(@Param("id") id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(":id")
  // update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.userService.remove(+id);
  // }
}
