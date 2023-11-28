import { UserDto } from '../../business/dtos/user.dto';
import { UserEntity } from '../../business/entities/user.entity';

export function createMockUserDto(): UserDto {
  return {
    name: 'testUser',
    email: 'testUser@gmail.com',
    password: 'testPass',
  };
}
export function createMockUserEntity(userDto: UserDto): UserEntity {
  return {
    id: 1,
    ...userDto,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

