import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({
    example: 'Portrait',
    description: 'The name of the service.',
  })
  name: string;

  @ApiProperty({
    example: 'Here is some description',
    description: 'The description of the service.',
  })
  description: string;

  @ApiProperty({
    example: 1000,
    description: 'The price of the service.',
  })
  price: number;
}