import { Book } from '../model';

export type GetBookByIDInput = {
  id: number;
};

export type GetBookByIDOutput = {
  book: Book | null;
};

export interface IGetBookByIDUsecase {
  execute(input: GetBookByIDInput): Promise<GetBookByIDOutput>;
}
