import { ApiProperty } from '@nestjs/swagger';
import { Service } from "@prisma/client";
import { IS_NOT_EMPTY, IS_NUMBER } from "class-validator";

export class CreateBookingDto {
  @ApiProperty({
    example: 1,
    description: 'The unique identifier of user associated with the booking.',
  })
  user_id: number;

  @ApiProperty({
    example: 1,
    description: 'The unique identifier of service associated with the booking.',
  })
  service_id: number;

  @ApiProperty({
    example: '2023-04-19T10:08:31Z',
    description: 'The date of the booking.',
  })

  booking_date: string
}