import { Controller, Post, Body, HttpStatus, Delete } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../providers/auth.service";
import { UserLoginDto, UserRegisterDto } from "../dto/auth.dto";
import {
  AuthLoginResponseDto,
  AuthRegisterResponseDto,
} from "../dto/auth.response.dto";

@ApiTags("user.auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({
    operationId: "userLogin",
    description: "Operation for user to login",
    summary: "User login",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthLoginResponseDto,
  })
  login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  }

  @Post("register")
  @ApiOperation({
    operationId: "userRegister",
    description: "Operation for user to register with email password",
    summary: "User register with username and password",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthRegisterResponseDto,
  })
  register(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.register(userRegisterDto);
  }

  @Delete("logout")
  @ApiOperation({
    operationId: "userLogout",
    description: "Operation for user to logout",
    summary: "User logout",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthRegisterResponseDto,
  })
  logout() {
    return this.authService.logout();
  }
}
