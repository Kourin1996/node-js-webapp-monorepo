import { Book } from '../../../../domain/book/model';

type BookRecord = {
  id: number;
  name: string;
  uuid: string;
  price: number;
  created_at?: Date;
  updated_at?: Date;
};

export function mapBookRecordToBookModel(
  record: BookRecord | null,
): Book | null {
  return record !== null
    ? Book.load({
        id: record.id,
        name: record.name,
        uuid: record.uuid,
        price: record.price,
        created_at: record.created_at,
        updated_at: record.updated_at,
      })
    : null;
}

export function mapBookModelToBookRecord(book: Book): BookRecord {
  return {
    id: book.id,
    name: book.name,
    uuid: book.uuid,
    price: book.price,
    created_at: book.created_at,
    updated_at: book.updated_at,
  };
}
