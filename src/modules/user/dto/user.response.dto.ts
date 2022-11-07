import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ERoleName } from "src/shared/type";

export class UserResponse {
  @ApiProperty()
  username: string;

  @ApiProperty()
  role: ERoleName;

  @ApiProperty()
  id: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  phoneNumber?: string;
}

export class UserResponseDto {
  @ApiProperty({ type: UserResponse })
  data: UserResponse;
}
