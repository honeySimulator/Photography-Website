import { ApiProperty } from '@nestjs/swagger';
import { Booking, Service, User } from "@prisma/client";

export class CreateCommentDto {


  @ApiProperty({
    description: 'The text of the comment',
    example: 'This is a great service!',
  })
  comment_text: string;
}

export class UpdateCommentDto {


  @ApiProperty()
  comment_text: string;

}