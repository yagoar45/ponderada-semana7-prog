import { UserServiceImpl } from '../../business/services/user.service.abstract';
import { UserDto } from '../../business/dtos/user.dto';
import { UserEntity } from '../../business/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService extends UserServiceImpl {
  constructor(private readonly repository: UserRepository) {
    super();
  }

  async createUser(dto: UserDto): Promise<UserEntity> {
    const userCreated = await this.repository.create(dto);
    return userCreated;
  }
  async findUserById(id: number): Promise<UserEntity> {
    const userFound = await this.repository.findById(id);
    return userFound;
  }
  async findAllUsersByQuery(): Promise<UserEntity[]> {
     return await this.repository.findAll();
  }
  async updateUserById(dto: UserDto, id: number): Promise<UserEntity> {
    const userUpdated = await this.repository.update(dto, id);
    return userUpdated;
  }
  async deleteUserById(id: number): Promise<UserEntity> {
    const userDeleted = await this.repository.delete(id);
    return userDeleted;
  }
}
