import { Book } from '../model';

export type CreateBookInput = {
  name: string;
  uuid: string;
  price: number;
};

export type CreateBookOutput = {
  book: Book;
};

export interface ICreateBookUsecase {
  execute(input: CreateBookInput): Promise<CreateBookOutput>;
}
