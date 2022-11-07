import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from "class-validator";
import { ERoleName } from "src/shared/type";

export class UserLoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    enum: ERoleName,
    type: "string",
  })
  @IsString()
  @IsEnum(ERoleName)
  @IsNotEmpty()
  role: ERoleName;
}

export class UserRegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  confirmPassword: string;

  @IsString()
  @ApiProperty({
    enum: ERoleName,
    type: "string",
  })
  @IsEnum(ERoleName)
  @IsNotEmpty()
  role: ERoleName;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phoneNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  address?: string;
}
