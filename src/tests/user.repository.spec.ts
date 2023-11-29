import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from 'src/business/dtos/user.dto';
import { UserRepository } from '../data/repositories/user.repository';
import { PrismaService } from '../data/services/prisma.service';
import { PasswordHasherUtil } from '../data/utils/passwordHasher.util';

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        PasswordHasherUtil,
        {
          provide: PrismaService,
          useValue: {
            user: {
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

    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

 it('should create a user', async () => {
  const userDto: UserDto = {
    name: 'franklin',
    email: 'franklin@gmail.com',
    password: 'frank123'
  };

  const userEntity = {
    id: 1,
    name: 'franklin',
    email: 'franklin@gmail.com',
    password: '$2b$10$8ytkeuImkhrXX7lMKNr0VutkIDgFsWFqlCHYyNajqPczGG.lbQ2k.',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockedUserRepository = userRepository as any;

  (mockedUserRepository.prisma.user.create as jest.Mock).mockResolvedValue(userEntity);

  const result = await userRepository.create(userDto);

  expect(result).toEqual(expect.objectContaining({ password: expect.any(String) }));
});

  

  it('should find all users', async () => {
    const users = [
      {
        id: 1,
        name: 'user1',
        email: 'user1@gmail.com',
        password: 'pass1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: 'user2',
        email: 'user2@gmail.com',
        password: 'pass2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const mockedUserRepository = userRepository as any;


    (mockedUserRepository.prisma.user.findMany as jest.Mock).mockResolvedValue(users);

    const result = await mockedUserRepository.findAll();

    expect(result).toEqual(users);
    expect(mockedUserRepository.prisma.user.findMany).toHaveBeenCalledWith();
  });

  it('should find user by id', async () => {
    const userId = 1;
    const user = {
      id: userId,
      name: 'foundUser',
      email: 'foundUser@gmail.com',
      password: 'foundPass',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockedUserRepository = userRepository as any;

    (mockedUserRepository.prisma.user.findUniqueOrThrow as jest.Mock).mockResolvedValue(user);

    const result = await mockedUserRepository.findById(userId);

    expect(result).toEqual(user);
    expect(mockedUserRepository.prisma.user.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });


  it('should update user by id', async () => {
    const userId = 1;
    const userDto: UserDto = {
      name: 'updatedUser',
      email: 'updatedUser@gmail.com',
      password: 'updatedPass',
    };
    const updatedUser = {
      id: userId,
      name: 'updatedUser',
      email: 'updatedUser@gmail.com',
      password: 'updatedPass',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockedUserRepository = userRepository as any;


    (mockedUserRepository.prisma.user.update as jest.Mock).mockResolvedValue(updatedUser);

    const result = await mockedUserRepository.update(userDto, userId);

    expect(result).toEqual(updatedUser);
    expect(mockedUserRepository.prisma.user.update).toHaveBeenCalledWith({
      data: { ...userDto, updatedAt: expect.any(Date) },
      where: { id: userId },
    });
  });

  it('should delete user by id', async () => {
    const userId = 1;
    const deletedUser = {
      id: userId,
      name: 'deletedUser',
      email: 'deletedUser@gmail.com',
      password: 'deletedPass',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const mockedUserRepository = userRepository as any;

    (mockedUserRepository.prisma.user.delete as jest.Mock).mockResolvedValue(deletedUser);

    const result = await mockedUserRepository.delete(userId);

    expect(result).toEqual(deletedUser);
    expect(mockedUserRepository.prisma.user.delete).toHaveBeenCalledWith({ where: { id: userId } });
  });
});
