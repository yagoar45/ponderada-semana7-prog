import { HistoryDto } from "../../business/dtos/history.dto";
import { HistoryEntity } from "../../business/entities/history.entity";
import { HistoryServiceImpl } from "../../business/services/history.service.abstract";
import { HistoryRepository } from "../repositories/history.repository";

export class HistoryService extends HistoryServiceImpl{
    constructor(private readonly repository: HistoryRepository){
        super();
    }
   async createHistoryForUser(dto: HistoryDto, extraId: number): Promise<HistoryEntity> {
        const historyCreated = await this.repository.create(dto, extraId);
        return historyCreated;
    }
    async findHistoryById(id: number): Promise<HistoryEntity> {
        const historyFound = await this.repository.findById(id);
        return historyFound;
    }
    async findAllHistories(): Promise<HistoryEntity[]> {
        const historiesFound = await this.repository.findAll();
        return historiesFound;
    }
    async updateHistoryByDtoAndId(dto: HistoryDto, id: number): Promise<HistoryEntity> {
        const historyUpdated = await this.repository.update(dto, id);
        return historyUpdated;
    }
    async  deleteHistoryById(id: number): Promise<HistoryEntity> {
        const historyDeleted = await this.repository.delete(id);
        return historyDeleted;
    }
    
}