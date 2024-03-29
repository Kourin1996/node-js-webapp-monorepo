import { Module } from '@nestjs/common';
import { PresentationModule } from './presentation/presentation.module';
import { UsecaseModule } from './usecase/usecase.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [DatabaseModule, UsecaseModule, PresentationModule],
})
export class AppModule {}
