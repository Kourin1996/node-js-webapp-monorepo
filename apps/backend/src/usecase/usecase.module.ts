import { Module } from '@nestjs/common/decorators';
import { BookUsecaseModule } from './book/book.module';

@Module({
  imports: [BookUsecaseModule],
  exports: [BookUsecaseModule],
})
export class UsecaseModule {}
