import { Test, TestingModule } from '@nestjs/testing';

import { NewsController } from '../controllers/news.controller';
import { NewsService } from '../services/news.service';

const mockNewsService = () => ({
  findAll: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
});

const mockPageDto = {
  page: 0,
};

describe('NewsController', () => {
  let newsController: NewsController;
  let newsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsController],
      providers: [
        {
          provide: NewsService,
          useFactory: mockNewsService,
        },
      ],
    }).compile();

    newsController = module.get<NewsController>(NewsController);
    newsService = module.get<NewsService>(NewsService);
  });

  it('should be defined', () => {
    expect(newsController).toBeDefined();
  });

  describe('getHackerNews', () => {
    it('calls newsService.findAll and returns the result', async () => {
      newsService.findAll.mockResolvedValue('someValue');
      const result = await newsController.getNews(mockPageDto);
      expect(result).toEqual('someValue');
    });
  });

  describe('getHackerNew', function () {
    it('calls newsService.find and returns the result', async () => {
      const mockFilterDto = {
        title: 'Title test',
        author: 'Author test',
        _tags: ['element test'],
      };

      newsService.find.mockResolvedValue('someValue');
      const result = await newsController.findOne(mockFilterDto, mockPageDto);
      expect(result).toEqual('someValue');
    });
  });

  describe('createHackerNew', function () {
    it('calls newsService.create and returns the result', async () => {
      const mockCreateNewDto = {
        title: 'Title test',
        created_at: 'date test',
        url: 'https://urltest.com',
        author: 'author test',
        points: 1,
        story_text: 'story test',
        comment_text: 'comment test',
        num_comments: 1,
        story_id: 12345,
        story_title: 'title test',
        story_url: 'https://urltest.com',
        parent_id: 1,
        created_at_i: 1,
        _tags: ['element test'],
        objectID: 'id test',
      };
      newsService.create.mockResolvedValue(mockCreateNewDto);
      const result = await newsController.create(mockCreateNewDto);
      expect(result).toEqual(mockCreateNewDto);
    });
  });
  //
  describe('updateHackerNew', function () {
    it('calls newsService.update and returns the result', async () => {
      const mockUpdateNewDto = {
        title: 'Title test',
        created_at: 'date test',
        url: 'https://urltest.com',
        author: 'author test',
        points: 1,
        story_text: 'story test',
        comment_text: 'comment test',
        num_comments: 1,
        story_id: 12345,
        story_title: 'title test',
        story_url: 'https://urltest.com',
        parent_id: 1,
        created_at_i: 1,
        _tags: ['element test'],
        objectID: 'id test',
      };

      newsService.update.mockResolvedValue(mockUpdateNewDto);
      const result = await newsController.update('someId', mockUpdateNewDto);
      expect(result).toEqual(mockUpdateNewDto);
    });
  });

  describe('deleteHackerNew', function () {
    it('calls newsService.delete and returns the result', async () => {
      newsService.remove.mockResolvedValue('someValue');
      const result = await newsController.delete('someId');
      expect(result).toEqual('someValue');
    });
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { NewsController } from './news.controller';

// describe('NewsController', () => {
//   let controller: NewsController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [NewsController],
//     }).compile();

//     controller = module.get<NewsController>(NewsController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });
