import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Length, Max, Min } from 'class-validator';

export class CreateBookRequest {
  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(1, 36)
  uuid: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(10000)
  price: number;
}
