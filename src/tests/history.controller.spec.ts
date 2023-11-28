import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { HistoryDto } from '../business/dtos/history.dto';
import { HistoryService } from '../data/services/history.service';
import {
  createMockHistoryDto,
  createMockHistoryEntity,
  createMocksHistoryEntity,
} from './mocks/history.mock';

jest.mock('../data/services/history.service');

describe('HistoryController (e2e)', () => {
  let app: INestApplication;
  let historyService: HistoryService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    historyService = moduleFixture.get<HistoryService>(HistoryService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('/history (POST) - should create a history', async () => {
    const historyDto: HistoryDto = {
      title: 'Test History',
      description: 'Test Description',
      category: 'Test Category',
    };
    const userId = 1;
    const mockCreatedHistory = createMockHistoryDto(); 
    const mockEntity = createMockHistoryEntity(mockCreatedHistory);
    jest
      .spyOn(historyService, 'createHistoryForUser')
      .mockResolvedValueOnce(mockEntity);
    return request(app.getHttpServer())
      .post(`/history/${userId}`)
      .send(historyDto)
      .expect(201)
      .expect((res) => {
        expect(res.body).toEqual(mockCreatedHistory);
      });
  });

  it('/history/:id (GET) - should find history by id', async () => {
    const historyId = 1;
    const mockHistoryDto = createMockHistoryDto();
    const created = createMockHistoryEntity(mockHistoryDto);

    jest
      .spyOn(historyService, 'findHistoryById')
      .mockResolvedValueOnce(created);

    return request(app.getHttpServer())
      .get(`/history/${historyId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(created);
      });
  });

  it('/histories (GET) - should find all histories', async () => {
    const mockHistories = createMocksHistoryEntity();
    jest
      .spyOn(historyService, 'findAllHistories')
      .mockResolvedValueOnce(mockHistories);
    return request(app.getHttpServer())
      .get('/histories')
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockHistories);
      });
  });

  it('/history/:id (PUT) - should update history by id', async () => {
    const historyId = 1;
    const historyDto: HistoryDto = {
      title: 'Updated Title',
      description: 'Updated Description',
      category: 'Updated Category',
    };

    const mockDeletedHistory = createMockHistoryEntity(historyDto);

    jest
      .spyOn(historyService, 'updateHistoryByDtoAndId')
      .mockResolvedValueOnce(mockDeletedHistory);

    return request(app.getHttpServer())
      .put(`/history/${historyId}`)
      .send(historyDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockDeletedHistory);
      });
  });

  it('/history/:id (DELETE) - should delete history by id', async () => {
    const historyId = 1;
    const mockHistoryDto = createMockHistoryDto();
    const mockDeletedHistory = createMockHistoryEntity(mockHistoryDto);

    jest
      .spyOn(historyService, 'deleteHistoryById')
      .mockResolvedValueOnce(mockDeletedHistory);

    return request(app.getHttpServer())
      .delete(`/history/${historyId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toEqual(mockDeletedHistory);
      });
  });
});
