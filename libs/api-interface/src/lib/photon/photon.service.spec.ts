import { Test, TestingModule } from '@nestjs/testing';
import { PhotonService } from './photon.service';

describe('PhotonService', () => {
  let service: PhotonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhotonService]
    }).compile();

    service = module.get<PhotonService>(PhotonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
