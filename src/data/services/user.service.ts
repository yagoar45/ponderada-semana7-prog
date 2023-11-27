import { UserServiceImpl } from 'src/business/services/user.service.abstract';
import { UserDto } from 'src/business/dtos/user.dto';
import { UserEntity } from 'src/business/entities/user.entity';
import { UserRepository } from '../repositories/user.repository';

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
  async findAllUsersByQuery(query?: string): Promise<UserEntity[]> {
    const usersFound = await this.repository.findAll(query);
    return usersFound;
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
