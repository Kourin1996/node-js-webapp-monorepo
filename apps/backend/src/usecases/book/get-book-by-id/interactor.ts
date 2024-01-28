import { Injectable } from '@nestjs/common';
import {
  GetBookByIDInput,
  GetBookByIDOutput,
  IGetBookByIDUsecase,
} from '../../../domain/book/usecases/get-book-by-id-usecase';
import { BookRepository } from '../../../domain/book/repository';

@Injectable()
export class GetBookByIDInteractor implements IGetBookByIDUsecase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(input: GetBookByIDInput): Promise<GetBookByIDOutput> {
    console.log(`getBookByID, id=${input.id}`);

    const book = await this.bookRepository.findByID(input.id);

    return {
      book: book,
    };
  }
}
