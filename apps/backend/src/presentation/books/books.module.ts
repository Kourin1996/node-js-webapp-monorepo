import { Module } from '@nestjs/common/decorators';
import { BookController } from './books.controller';
import { BookUsecaseModule } from '../../usecase/book/book.module';

@Module({
  imports: [BookUsecaseModule],
  controllers: [BookController],
})
export class BookControllerModule {}
