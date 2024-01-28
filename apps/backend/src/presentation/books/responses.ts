import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../../domain/book/model';

export class BookResponse {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  readonly created_at?: Date;

  @ApiProperty()
  readonly updated_at?: Date;

  constructor(book: Book) {
    this.id = book.id;
    this.name = book.name;
    this.uuid = book.uuid;
    this.price = book.price;
    this.created_at = book.created_at;
    this.updated_at = book.updated_at;
  }
}
