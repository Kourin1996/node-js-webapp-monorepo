import { LoadBookDTO, CreateBookDTO, NewBookDTO } from './dto';

export class Book {
  readonly id?: number;
  name: string;
  uuid: string;
  price: number;
  readonly created_at?: Date;
  readonly updated_at?: Date;

  constructor(dto: NewBookDTO) {
    this.id = dto.id;
    this.name = dto.name;
    this.uuid = dto.uuid;
    this.price = dto.price;
    this.created_at = dto.created_at;
    this.updated_at = dto.updated_at;
  }

  public static create(dto: CreateBookDTO) {
    return new Book({
      name: dto.name,
      uuid: dto.uuid,
      price: dto.price,
    });
  }

  public static load(dto: LoadBookDTO) {
    return new Book({
      id: dto.id,
      name: dto.name,
      uuid: dto.uuid,
      price: dto.price,
      created_at: dto.created_at,
      updated_at: dto.updated_at,
    });
  }
}
