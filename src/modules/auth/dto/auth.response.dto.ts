import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginResponseDto {
  @ApiProperty()
  accessToken: string;
}

export class AuthRegisterResponseDto extends AuthLoginResponseDto {}
