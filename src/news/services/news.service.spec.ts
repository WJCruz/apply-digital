import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { getModelToken } from '@nestjs/mongoose';

import { NewsService } from '../services/news.service';
import { New } from '../entities/new.entity';

const mockHttpService = () => ({
  get: jest.fn(),
});
const mockNewModel = () => ({
  find: jest.fn(() => mockNewModel),
  skip: jest.fn(() => []),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
});

describe('HackerNewsService', () => {
  let newService;
  let newModel;
  let httpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NewsService,
        {
          provide: HttpService,
          useFactory: mockHttpService,
        },
        {
          provide: getModelToken(New.name),
          useFactory: mockNewModel,
        },
      ],
    }).compile();

    newService = module.get<NewsService>(NewsService);
    newModel = module.get(getModelToken(New.name));
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(newService).toBeDefined();
  });

  describe('findAll', () => {
    it('should call the right methods', async () => {
      const bodyMock = { page: 1 };
      mockNewModel().find.mockResolvedValue([
        {
          title: 'test',
          deleted: false,
        },
      ]);
      const result = newService.findAll(bodyMock);
      expect(result).toEqual('someValue');
    });
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
// import { NewsService } from './news.service';

// describe('NewsService', () => {
//   let service: NewsService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [NewsService],
//     }).compile();

//     service = module.get<NewsService>(NewsService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });
// });
