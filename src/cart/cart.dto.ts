import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({
    description: 'The id of the Service',
    example: '1',
  })
  service_id: number;
}
