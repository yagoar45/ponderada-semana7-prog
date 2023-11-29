import {
  Controller,
  Post,
  Param,
  Put,
  Delete,
  Get,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { HistoryDto } from '../../business/dtos/history.dto';
import { HistoryService } from '../../data/services/history.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { OpenAiIntegration } from '../../integration/openai.integration';

@ApiTags('histories')
@Controller()
export class HistoryController {
  constructor(
    private readonly historyService: HistoryService,
    private readonly gptIntegraton: OpenAiIntegration,
  ) {}

  @ApiOperation({ summary: 'Create a new history' })
  @ApiResponse({
    status: 201,
    description: 'The history has been successfully created',
  })
  @Post('/history/:id')
  async createHistoryForUser(@Param('id', new ParseIntPipe()) id: number) {
    const { title, description, category } = await this.gptIntegraton.createHistoryDetails();
    const titleReplaced = title.replace("Title:", "");
    const dto = { title:titleReplaced, description, category };
    return await this.historyService.createHistoryForUser(dto, id);
  }

  @ApiOperation({ summary: 'Get a history by ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the history with the specified ID',
  })
  @Get('/history/:id')
  async findHistoryById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.historyService.findHistoryById(id);
  }

  @ApiOperation({ summary: 'Get all histories' })
  @ApiResponse({ status: 200, description: 'Return all histories' })
  @Get('/histories')
  async findAllHistories() {
    return await this.historyService.findAllHistories();
  }

  @ApiOperation({ summary: 'Update a history by ID' })
  @ApiResponse({
    status: 200,
    description: 'The history has been successfully updated',
  })
  @Put('/history/:id')
  async updateHistoryById(
    @Body() dto: HistoryDto,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    return await this.historyService.updateHistoryByDtoAndId(dto, id);
  }

  @ApiOperation({ summary: 'Delete a history by ID' })
  @ApiResponse({
    status: 200,
    description: 'The history has been successfully deleted',
  })
  @Delete('/history/:id')
  async deleteHistoryById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.historyService.deleteHistoryById(id);
  }
}
