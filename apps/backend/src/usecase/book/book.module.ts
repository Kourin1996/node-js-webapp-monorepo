import { Module } from '@nestjs/common/decorators';
import { CreateBookInteractor } from './create-book/interactor';
import { GetBookByIDInteractor } from './get-book-by-id/interactor';
import { DatabaseModule } from '../../infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CreateBookInteractor, GetBookByIDInteractor],
  exports: [DatabaseModule, CreateBookInteractor, GetBookByIDInteractor],
})
export class BookUsecaseModule {}
