import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { HistoryDto } from '../business/dtos/history.dto';
import { HistoryService } from '../data/services/history.service';
import {
  createMockHistoryDto,
  createMockHistoryEntity,
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
  },100000000);

  afterAll(async () => {
    await app.close();
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
      .timeout(10000) 
      .expect((res) => {
        const expectedCreatedAt = new Date("2023-11-29T00:26:47.094Z").toISOString();
        const receivedCreatedAt = new Date(res.body.createdAt).toISOString();
        expect(receivedCreatedAt).toEqual(expectedCreatedAt);      
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
      .timeout(10000) 
      .expect((res) => {
        const receivedCreatedAt = new Date(res.body.createdAt);
        expect(receivedCreatedAt).toEqual(mockDeletedHistory.createdAt);
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
      .timeout(10000) // Adicionando timeout de 10 segundos
      .expect((res) => {
        const receivedCreatedAt = new Date(res.body.createdAt);
        expect(receivedCreatedAt).toEqual(mockDeletedHistory.createdAt);
        });
  });
});
