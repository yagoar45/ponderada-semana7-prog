import { Module } from '@nestjs/common';
import { UserController } from './api/controllers/user.controller';
import { HistoryController } from './api/controllers/history.controller';
import { UserService } from './data/services/user.service';
import { HistoryService } from './data/services/history.service';
import { UserRepository } from './data/repositories/user.repository';
import { HistoryRepository } from './data/repositories/history.repository';
import { PrismaService } from './data/services/prisma.service';
import { OpenAiIntegration } from './integration/openai.integration';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './api/auth/auth.service';
import { PasswordHasherUtil } from './data/utils/passwordHasher.util';
import { JwtAuthGuard } from './api/auth/auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_AUTH_KEY,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [UserController, HistoryController],
  providers: [
    PrismaService,
    UserRepository,
    HistoryRepository,
    UserService,
    HistoryService,
    OpenAiIntegration,
    AuthService,
    PasswordHasherUtil,
    JwtAuthGuard
  ],
})
export class AppModule {}
