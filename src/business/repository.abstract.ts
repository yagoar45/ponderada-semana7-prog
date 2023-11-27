import { UserDto } from "./dtos/user.dto";
import { HistoryDto } from "./dtos/history.dto";
import { UserEntity } from "./entities/user.entity";

export abstract class RepositoryImpl<T> {
  abstract create(dto: T extends UserEntity ? UserDto : HistoryDto, extraId?: number): Promise<T>;
  abstract findAll(query?:string): Promise<T[]>;
  abstract findById(id: number): Promise<T>;
  abstract update(dto: T extends UserEntity ? UserDto : HistoryDto, id: number): Promise<T>;
  abstract delete(id: number): Promise<T>;
}
