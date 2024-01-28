import { Book } from './model';

export abstract class BookRepository {
  abstract findByID(id: number): Promise<Book | null>;
  abstract create(book: Book): Promise<Book>;
}
