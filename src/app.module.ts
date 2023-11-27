import { Module } from '@nestjs/common';
import { DataModule } from './data/data.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [DataModule, ApiModule],
})
export class AppModule {}
