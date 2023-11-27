import { History } from '@prisma/client';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class HistoryEntity implements History {
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  userId: number;

  @IsDate()
  createdAt: Date;
}
