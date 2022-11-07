import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ERoleName } from "src/shared/type";

export class UserResponseDto {
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
