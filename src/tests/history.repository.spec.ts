import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../data/services/prisma.service';
import { HistoryRepository } from '../data/repositories/history.repository';
import { HistoryDto } from '../business/dtos/history.dto';
import { HistoryEntity } from '../business/entities/history.entity';
import { createMocksHistoryEntity } from './mocks/history.mock';

describe('HistoryRepository', () => {
  let historyRepository: HistoryRepository;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HistoryRepository,
        {
          provide: PrismaService,
          useValue: {
            history: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUniqueOrThrow: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    historyRepository = module.get<HistoryRepository>(HistoryRepository);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe('create', () => {
    it('should create a history', async () => {
      const historyDto: HistoryDto = {
        title: '',
        description: '',
        category: '',
      };
      const extraId = 123;

      const mockCreatedHistory: HistoryEntity = {
        id: 0,
        title: '',
        description: '',
        category: '',
        userId: 0,
        createdAt: undefined,
      };

      jest
        .spyOn(prismaService.history, 'create')
        .mockResolvedValueOnce(mockCreatedHistory);

      const result = await historyRepository.create(historyDto, extraId);

      expect(result).toEqual(mockCreatedHistory);
      expect(prismaService.history.create).toHaveBeenCalledWith({
        data: {
          ...historyDto,
          user: {
            connect: {
              id: extraId,
            }
          }
        },
      });
    });

    it('should throw an error if creation fails', async () => {
      const historyDto: HistoryDto = {
        title: '',
        description: '',
        category: '',
      };
      const extraId = 123;

      jest
        .spyOn(prismaService.history, 'create')
        .mockRejectedValueOnce(new Error('Failed to create'));

      await expect(
        historyRepository.create(historyDto, extraId),
      ).rejects.toThrowError('Failed to create');
    });
  });

  describe('findById', () => {
    it('should find a history by ID', async () => {
      const historyId = 1;
      const mockHistory: HistoryEntity = {
        id: historyId,
        title: '',
        description: '',
        category: '',
        userId: 0,
        createdAt: undefined,
      };
      jest
        .spyOn(prismaService.history, 'findUniqueOrThrow')
        .mockResolvedValueOnce(mockHistory);
      const result = await historyRepository.findById(historyId);
      expect(result).toEqual(mockHistory);
      expect(prismaService.history.findUniqueOrThrow).toHaveBeenCalledWith({
        where: {
          id: historyId,
        },
      });
    });
  });
  describe('findAll', () => {
    it('should find all histories', async () => {
      const mockHistories: HistoryEntity[] = createMocksHistoryEntity();
      jest
        .spyOn(prismaService.history, 'findMany')
        .mockResolvedValueOnce(mockHistories);
      const result = await historyRepository.findAll();
      expect(result).toEqual(mockHistories);
      expect(prismaService.history.findMany).toHaveBeenCalled();
    });
  });   

  describe('update', () => {
    it('should update a history by ID', async () => {
      const historyId = 1;
      const historyDto: HistoryDto = {
        title: 'Updated Title',
        description: 'Updated Description',
        category: 'Updated Category',
      };

      const mockUpdatedHistory: HistoryEntity = {
        id: historyId,
        title: 'Updated Title',
        description: 'Updated Description',
        category: 'Updated Category',
        userId: 0,
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.history, 'update').mockResolvedValueOnce(mockUpdatedHistory);

      const result = await historyRepository.update(historyDto, historyId);

      expect(result).toEqual(mockUpdatedHistory);
      expect(prismaService.history.update).toHaveBeenCalledWith({
        data: {
          ...historyDto,
        },
        where: {
          id: historyId,
        },
      });
    });
  });

  describe('delete', () => {
    it('should delete a history by ID', async () => {
      const historyId = 1;

      const mockDeletedHistory: HistoryEntity = {
        id: historyId,
        title: 'Deleted Title',
        description: 'Deleted Description',
        category: 'Deleted Category',
        userId: 0,
        createdAt: new Date(),
      };

      jest.spyOn(prismaService.history, 'delete').mockResolvedValueOnce(mockDeletedHistory);

      const result = await historyRepository.delete(historyId);

      expect(result).toEqual(mockDeletedHistory);
      expect(prismaService.history.delete).toHaveBeenCalledWith({
        where: {
          id: historyId,
        },
      });
    });
  });
});
