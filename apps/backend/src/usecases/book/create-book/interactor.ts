import { Injectable } from '@nestjs/common';
import { Book } from '../../../domain/book/model';
import {
  CreateBookInput,
  CreateBookOutput,
  ICreateBookUsecase,
} from '../../../domain/book/usecases/create-book-usecase';
import { BookRepository } from '../../../domain/book/repository';

@Injectable()
export class CreateBookInteractor implements ICreateBookUsecase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(input: CreateBookInput): Promise<CreateBookOutput> {
    const book = Book.create({
      name: input.name,
      uuid: input.uuid,
      price: input.price,
    });

    const result = await this.bookRepository.create(book);

    return {
      book: result,
    };
  }
}
