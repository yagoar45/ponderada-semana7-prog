import { Module } from '@nestjs/common';
import { UserController } from './api/controllers/user.controller';
import { HistoryController } from './api/controllers/history.controller';
import { UserService } from './data/services/user.service';
import { HistoryService } from './data/services/history.service';
import { UserRepository } from './data/repositories/user.repository';
import { HistoryRepository } from './data/repositories/history.repository';
import { PrismaService } from './data/services/prisma.service';
import { OpenAiIntegration } from './integration/openai.integration';

@Module({
  controllers: [UserController, HistoryController],
  providers: [
    PrismaService,
    UserRepository,
    HistoryRepository,
    UserService,
    HistoryService,
    OpenAiIntegration
  ],
})
export class AppModule {}
