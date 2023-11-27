import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/business/dtos/user.dto';
import { UserEntity } from 'src/business/entities/user.entity';
import { RepositoryImpl } from 'src/business/repository.abstract';
import { PrismaService } from '../services/prisma.service';

@Injectable()
export class UserRepository extends RepositoryImpl<UserEntity> {
  constructor(private readonly prisma: PrismaService) {
      super();
  }

  async create(dto: UserDto): Promise<UserEntity> {
    try {
      const userCreated = await this.prisma.user.create({
        data: {
          ...dto,
          deletedAt: null,
        },
      });
      return userCreated;
    } catch (error) {
      console.log(`Erro => ${error.message}`);
      throw new Error(error);
    }
  }
  async findAll(query?: string): Promise<UserEntity[]> {
    try {
      let whereCondition = {};
      if (query) {
        whereCondition = {
          deletedAt: null,
        };
      }
      const usersFound = await this.prisma.user.findMany({
        where: whereCondition,
      });
      return usersFound;
    } catch (error) {
      console.error(`Erro => ${error.message}`);
      throw new Error('Erro ao buscar históricos.');
    }
  }
  async findById(id: number): Promise<UserEntity> {
    try {
      const userFound = await this.prisma.user.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      return userFound;
    } catch (error) {
      console.log(`Erro => ${error.message}`);
      throw new Error(error);
    }
  }
  async update(dto: UserDto, id: number): Promise<UserEntity> {
    try {
      const userUpdated = await this.prisma.user.update({
        data: {
          ...dto,
        },
        where: {
          id: id,
        },
      });
      return userUpdated;
    } catch (error) {
      console.log(`Erro => ${error.message}`);
      throw new Error(error);
    }
  }
  async delete(id: number): Promise<UserEntity> {
    try {
      const userDeleted = await this.prisma.user.update({
        data: {
          deletedAt: new Date(),
        },
        where: {
          id: id,
        },
      });
      return userDeleted;
    } catch (error) {
      console.log(`Erro => ${error.message}`);
      throw new Error(error);
    }
  }
}
