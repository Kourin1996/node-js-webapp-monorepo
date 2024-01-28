import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { BookRepository } from '../../../domain/book/repository';
import { PrismaBookRepository } from './book/repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: BookRepository,
      useClass: PrismaBookRepository,
    },
  ],
  exports: [BookRepository],
})
export class PrismaModule {}
