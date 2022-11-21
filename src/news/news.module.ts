import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { NewsController } from './controllers/news.controller';
import { NewsService } from './services/news.service';
import { New, NewSchema } from './entities/new.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: New.name,
        schema: NewSchema,
      },
    ]),
    HttpModule,
  ],
  controllers: [NewsController],
  providers: [NewsService],
  exports: [NewsService],
})
export class NewsModule {}
