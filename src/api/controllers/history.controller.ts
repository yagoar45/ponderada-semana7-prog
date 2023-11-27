import { Controller, Post, Param, Put, Delete, Get, Body, ParseIntPipe } from "@nestjs/common";
import { HistoryDto } from "src/business/dtos/history.dto";
import { HistoryService } from "src/data/services/history.service";

@Controller()
export class HistoryController {
    constructor(private readonly historyService: HistoryService){}

    @Post('/history')
    async createHistoryForUser(@Body() dto: HistoryDto, @Param('id', new ParseIntPipe()) id: number)  {
        return await this.historyService.createHistoryForUser(dto, id);
    }

    @Get('/history/:id')
    async findHistoryById(@Param('id', new ParseIntPipe()) id: number){
        return await this.historyService.findHistoryById(id);
    }

    @Get('/histories')
    async findAllHistories() {
        return await this.historyService.findAllHistories();
    }

    @Put('/history/:id')
    async updateHistoryById(@Body() dto: HistoryDto, @Param('id', new ParseIntPipe()) id:number) {
        return await this.historyService.updateHistoryByDtoAndId(dto, id);
    }

    @Delete('/history/:id')
    async deleteHistoryById(@Param('id', new ParseIntPipe()) id: number){
        return await this.historyService.deleteHistoryById(id);
    }
}