import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';

describe('AppService', () => {
  let service: AppService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: HttpService,
          useValue: {
            get: jest
              .fn()
              .mockImplementation(() =>
                of({ data: { customer: 0, reserve: 0 } }),
              ),
          },
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return expected data', async () => {
    const result = await service.metaData();
    expect(result).toEqual({ customer: 0, reserve: 0 });
  });
});

//
