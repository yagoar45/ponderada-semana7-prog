import { UserDto } from "../dtos/user.dto";
import { UserEntity } from "../entities/user.entity";

export abstract class UserServiceImpl {
   abstract createUser(dto: UserDto): Promise<UserEntity>;
   abstract findUserById(id: number): Promise<UserEntity>;
   abstract findAllUsersByQuery(query?: string): Promise<UserEntity[]>;
   abstract updateUserById(dto: UserDto, id:number): Promise<UserEntity>;
   abstract deleteUserById(id:number): Promise<UserEntity>;
}