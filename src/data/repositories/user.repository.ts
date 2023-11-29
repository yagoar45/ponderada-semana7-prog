import { Injectable } from '@nestjs/common';
import { UserDto } from '../../business/dtos/user.dto';
import { UserEntity } from '../../business/entities/user.entity';
import { RepositoryImpl } from '../../business/repository.abstract';
import { PrismaService } from '../services/prisma.service';
import { PasswordHasherUtil } from '../utils/passwordHasher.util';

@Injectable()
export class UserRepository extends RepositoryImpl<UserEntity> {
  constructor(private readonly prisma: PrismaService, private readonly passwordHasher: PasswordHasherUtil) {
      super();
  }

    async create(dto: UserDto): Promise<UserEntity> {
      const passwordHashed = await this.passwordHasher.hashPassword(dto.password);
      try {
        const userCreated = await this.prisma.user.create({
          data:{
            ... dto as any,
            password: passwordHashed
          }
        });
        return userCreated;
      } catch (error) {
        console.log(`Erro => ${error.message}`);
        throw new Error(error);
      }
    }
    async findAll(): Promise<UserEntity[]> {
      try {
        const usersFound = await this.prisma.user.findMany();
        return usersFound;
      } catch (error) {
        console.error(`Erro => ${error.message}`);
        throw new Error('Erro ao buscar usuários.');
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
          updatedAt: new Date()
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
      const userDeleted = await this.prisma.user.delete({
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
