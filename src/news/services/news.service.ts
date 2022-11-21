import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Model } from 'mongoose';

import { New } from '../entities/new.entity';
import {
  CreateNewDto,
  UpdateNewDto,
  PageNewsDto,
  FilterNewsDto,
} from '../dtos/news.dtos';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  constructor(
    @InjectModel(New.name) private newModel: Model<New>,
    private readonly httpService: HttpService,
  ) {}
  async onModuleInit() {
    await this.getDataFromApi();
  }

  async findAll(params?: PageNewsDto) {
    try {
      if (params) {
        const { page } = params;
        return this.newModel
          .find({ deleted: false })
          .skip(5 * page)
          .limit(5)
          .exec();
      }
      return this.newModel.find().exec();
    } catch (e) {
      this.logger.error(e.message);
      throw new NotFoundException(`HackerNews remove error.`);
    }
  }

  async find(data: FilterNewsDto, params?: PageNewsDto) {
    try {
      if (params) {
        const { page } = params;
        if (data.author || data._tags || data.title) {
          return this.newModel
            .find()
            .and([data, { deleted: false }])
            .skip(5 * page)
            .limit(5)
            .exec();
        } else {
          return this.newModel
            .find()
            .and([data, { deleted: false }])
            .skip(5 * page)
            .limit(5)
            .exec();
        }
      }
      return this.newModel.find(data).exec();
    } catch (e) {
      this.logger.error(e.message);
      // throw new NotFoundException(`HackerNews find error.`);
    }
  }

  create(data: CreateNewDto) {
    const hackerNew = new this.newModel(data);
    return hackerNew.save();
  }

  async update(id: string, changes: UpdateNewDto) {
    try {
      const founded = await this.newModel.findById(id).exec();
      if (founded) {
        if (founded.deleted) {
          throw new NotFoundException(`New #${id} not found`);
        } else {
          return this.newModel
            .findByIdAndUpdate(
              id,
              { $set: changes },
              { new: true, useFindAndModify: false },
            )
            .exec();
        }
      } else {
        throw new NotFoundException(`New #${id} not found`);
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new NotFoundException(`HackerNews update error.`);
    }
  }

  async remove(id: string) {
    try {
      const founded = await this.newModel.findById(id).exec();
      if (founded) {
        if (founded.deleted) {
          throw new NotFoundException(`New #${id} not found`);
        } else {
          return this.newModel.findByIdAndUpdate(
            id,
            { $set: { deleted: true } },
            { new: true, useFindAndModify: false },
          );
        }
      } else {
        throw new NotFoundException(`New #${id} not found`);
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new NotFoundException(`HackerNews remove error.`);
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async getDataFromApi() {
    try {
      const data = await this.httpService
        .get(`https://hn.algolia.com/api/v1/search_by_date?query=nodejs`)
        .toPromise()
        .then((res) => res.data.hits);

      for (const i in data) {
        const jsonToPost = {
          created_at: data[i]['created_at'],
          title: data[i]['title'],
          url: data[i]['url'],
          author: data[i]['author'],
          points: data[i]['points'],
          story_text: data[i]['story_text'],
          comment_text: data[i]['comment_text'],
          num_comments: data[i]['num_comments'],
          story_id: data[i]['story_id'],
          story_title: data[i]['story_title'],
          story_url: data[i]['story_url'],
          parent_id: data[i]['parent_id'],
          created_at_i: data[i]['created_at_i'],
          _tags: data[i]['_tags'],
          objectID: data[i]['objectID'],
        };

        const founded = await this.find(jsonToPost);
        if (founded.length == 0) {
          await this.create(jsonToPost);
        }
      }
    } catch (e) {
      this.logger.error(e.message);
      throw new NotFoundException(`HackerNews can't load.`);
    }
  }
}
