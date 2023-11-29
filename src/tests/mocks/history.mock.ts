import { HistoryDto } from 'src/business/dtos/history.dto';
import { HistoryEntity } from 'src/business/entities/history.entity';

export function createMocksHistoryEntity(): HistoryEntity[] {
  return [
    {
      id: 1,
      title: '',
      description: '',
      category: '',
      userId: 1,
      createdAt: new Date(),
    },
    {
      id: 2,
      title: '',
      description: '',
      category: '',
      userId: 1,
      createdAt: new Date(),
    },
    {
      id: 3,
      title: '',
      description: '',
      category: '',
      userId: 1,
      createdAt: new Date(),
    },
    {
      id: 4,
      title: '',
      description: '',
      category: '',
      userId: 1,
      createdAt: new Date(),
    },
  ];
}

export function createMockHistoryDto(): HistoryDto {
  return {
    title: '',
    description: '',
    category: '',
  };
}
export function createMockHistoryEntity(dto: HistoryDto): HistoryEntity {
  return {
    id: 1,
    ...dto,
    userId: 2,
    createdAt: new Date("2023-11-29T00:26:47.094Z"),
  };
}
