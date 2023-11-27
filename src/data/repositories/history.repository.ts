import { HistoryDto } from 'src/business/dtos/history.dto';
import { HistoryEntity } from 'src/business/entities/history.entity';
import { RepositoryImpl } from 'src/business/repository.abstract';
import { PrismaService } from '../services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HistoryRepository extends RepositoryImpl<HistoryEntity> {
  constructor(private readonly prisma: PrismaService) {
      super();
  }

  async create(dto: HistoryDto,extraId: number): Promise<HistoryEntity> {
    try {
      const historyCreated = await this.prisma.history.create({
        data: {
          ...dto,
          userId: extraId,
        },
      });
      return historyCreated;
    } catch (error) {
        console.log(`Erro => ${error.message}`);
        throw new Error(error);
    }
  }
  async findAll(): Promise<HistoryEntity[]> {
    try {
      const historiesFound = await this.prisma.history.findMany();
      return historiesFound;
    } catch (error) {
      console.error(`Erro => ${error.message}`);
      throw new Error("Erro ao buscar históricos.");
    }
  }
  
  async findById(id: number): Promise<HistoryEntity> {
    try {
      const historyFound = await this.prisma.history.findUniqueOrThrow({
        where: {
          id: id,
        },
      });
      return historyFound;
    } catch (error) {
      console.log(`Erro => ${error.message}`);
      throw new Error(error);
    }
  }
  async update(dto: HistoryDto, id: number): Promise<HistoryEntity> {
    try {
      const historyUpdated = await this.prisma.history.update({
        data: {
          ...dto,
        },
        where: {
          id: id,
        },
      });
      return historyUpdated;
    } catch (error) {
      console.log(`Erro => ${error.message}`);
      throw new Error(error);
    }
  }
  async delete(id: number): Promise<HistoryEntity> {
    try {
      const historyDeleted = await this.prisma.history.delete({
        where: {
          id: id,
        },
      });
      return historyDeleted;
    } catch (error) {
      console.log(`Erro => ${error.message}`);
      throw new Error(error);
    }
  }
}
