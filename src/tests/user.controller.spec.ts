import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { UserDto } from '../business/dtos/user.dto';
import { UserService } from '../data/services/user.service';
import { UserEntity } from '../business/entities/user.entity';
import { createMockUserDto, createMockUserEntity } from './mocks/user.mock';

jest.mock('../data/services/user.service');

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let moduleFixture: TestingModule; 

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/user (POST) - should create a user', async () => {
    const userDto: UserDto = createMockUserDto();
    const mockUserEntity: UserEntity = createMockUserEntity(userDto);

    const userService = moduleFixture.get<UserService>(UserService) as jest.Mocked<UserService>;
    userService.createUser.mockResolvedValueOnce(mockUserEntity);

    return request(app.getHttpServer())
      .post('/user')
      .send(userDto)
      .expect(201)
      .expect((res) => {
        expect(res.body.user.name).toBe(userDto.name);
        expect(res.body.user.email).toBe(userDto.email);
      });
  });

  it('/users (GET) - should find all active users', async () => {
    const userService = moduleFixture.get<UserService>(UserService) as jest.Mocked<UserService>;
    const mockUsers: UserEntity[] = [createMockUserEntity(createMockUserDto())];
    userService.findAllUsersByQuery.mockResolvedValueOnce(mockUsers);

    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect((res) => {
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBe(1);
      });
  });

  it('/user/:id (PUT) - should update user by id', async () => {
    const userId = 1;
    const updatedUserDto: UserDto = {
      name: 'updatedName',
      email: 'updatedEmail@gmail.com',
      password: 'updatedPass',
    };

    const userService = moduleFixture.get<UserService>(UserService) as jest.Mocked<UserService>;
    const mockUpdatedUser: UserEntity = createMockUserEntity(updatedUserDto);
    userService.updateUserById.mockResolvedValueOnce(mockUpdatedUser);

    return request(app.getHttpServer())
      .put(`/user/${userId}`)
      .send(updatedUserDto)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toBe(updatedUserDto.name);
        expect(res.body.email).toBe(updatedUserDto.email);
        // Adicione mais verificações conforme necessário
      });
  });

  it('/user/:id (DELETE) - should delete user by id', async () => {
    const userId = 1;
    const userService = moduleFixture.get<UserService>(UserService) as jest.Mocked<UserService>;
    userService.deleteUserById.mockResolvedValueOnce(new UserEntity());

    return request(app.getHttpServer())
      .delete(`/user/${userId}`)
      .expect(200)
  });

});
