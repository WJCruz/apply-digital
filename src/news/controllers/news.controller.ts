import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';

import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { MongoIdPipe } from '../../common/mongo-id.pipe';
import {
  CreateNewDto,
  UpdateNewDto,
  PageNewsDto,
  FilterNewsDto,
} from '../dtos/news.dtos';
import { NewsService } from '../services/news.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'List of HackerNews' })
  getNews(@Query() params: PageNewsDto) {
    return this.newsService.findAll(params);
  }

  @Post('/create')
  @HttpCode(HttpStatus.OK)
  create(@Body() payload: CreateNewDto) {
    return this.newsService.create(payload);
  }

  @Post('/find')
  @HttpCode(HttpStatus.OK)
  findOne(@Body() payload: FilterNewsDto, @Query() params: PageNewsDto) {
    return this.newsService.find(payload, params);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', MongoIdPipe) id: string, @Body() payload: UpdateNewDto) {
    return this.newsService.update(id, payload);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', MongoIdPipe) id: string) {
    return this.newsService.remove(id);
  }
}
