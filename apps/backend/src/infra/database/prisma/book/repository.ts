import { Injectable } from '@nestjs/common';
import { Book } from '../../../../domain/book/model';
import { BookRepository } from '../../../../domain/book/repository';
import { PrismaService } from '../prisma.service';
import { mapBookModelToBookRecord, mapBookRecordToBookModel } from './mapper';

@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private prisma: PrismaService) {}

  async findByID(id: number): Promise<Book> {
    const record = await this.prisma.book.findUnique({
      where: {
        id: id,
      },
    });

    return mapBookRecordToBookModel(record);
  }

  async create(book: Book): Promise<Book> {
    const input = mapBookModelToBookRecord(book);

    const output = await this.prisma.book.create({
      data: input,
    });

    return mapBookRecordToBookModel(output);
  }
}
