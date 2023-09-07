import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    description: 'The username of the User',
    example: 'username',
  })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'The password of the User',
    example: 'password1',
  })
  @IsNotEmpty()
  readonly password: string;
}
