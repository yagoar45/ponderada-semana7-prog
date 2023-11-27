import { HistoryDto } from "../dtos/history.dto";
import { HistoryEntity } from "../entities/history.entity";

export abstract class HistoryServiceImpl {
   abstract createHistoryForUser(dto: HistoryDto, extraId: number): Promise<HistoryEntity>;
   abstract findHistoryById(id: number): Promise<HistoryEntity>;
   abstract findAllHistories(): Promise<HistoryEntity[]>;
   abstract updateHistoryByDtoAndId(dto: HistoryDto, id: number): Promise<HistoryEntity>; 
   abstract deleteHistoryById(id: number): Promise<HistoryEntity>;
}