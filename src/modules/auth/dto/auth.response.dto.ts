import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginResponse {
  @ApiProperty()
  accessToken: string;
}

export class AuthLoginResponseDto {
  @ApiProperty({ type: AuthLoginResponse })
  data: AuthLoginResponse;
}

export class AuthRegisterResponse extends AuthLoginResponse {}
export class AuthRegisterResponseDto {
  @ApiProperty({ type: AuthRegisterResponse })
  data: AuthRegisterResponse;
}
