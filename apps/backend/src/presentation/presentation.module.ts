import { Module } from '@nestjs/common/decorators';
import { BookControllerModule } from './books/books.module';

@Module({
  imports: [BookControllerModule],
  exports: [BookControllerModule],
})
export class PresentationModule {}
