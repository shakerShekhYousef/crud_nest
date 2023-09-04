import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsUUID,
} from "class-validator";
import { User } from "../../user/entities/user.entity";

export class CreateBlogDto {
  @ApiProperty({
    type: String,
    required: true,
    example: "test",
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    type: String,
    required: true,
    example: "test",
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    type: Boolean,
    required: false,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isActive!: boolean;

  user!: User;

  userId!: any;
}
