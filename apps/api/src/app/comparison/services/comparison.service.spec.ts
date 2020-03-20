import { Test, TestingModule } from '@nestjs/testing';
import { ComparisonService } from './comparison.service';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';
import { TestSessionState } from '@generated/photonjs';

describe('ComparisonService', () => {
  let service: ComparisonService;
  let photonService: PhotonService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComparisonService,
        {
          provide: PhotonService,
          useValue: {
            testSession: {
              update: jest.fn()
            }
          }
        },
        { provide: CloudProviderService, useValue: {} }
      ]
    }).compile();
    service = module.get<ComparisonService>(ComparisonService);
    photonService = module.get<PhotonService>(PhotonService);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('updateImageData', () => {
    const params = {
      testSessionId: 'testSessionId',
      imageKey: 'testSession.imageKey',
      state: TestSessionState.UNRESOLVED,
      diffImageKey: 'diffImageKey',
      diffBaselineRef: 'diffBaselineRef',
      misMatchPercentage: 15,
      isSameDimensions: true
    };

    it('should update image data', () => {
      photonService.testSession.update = jest
        .fn()
        .mockResolvedValueOnce(params);

      service['updateImageData'](
        params.testSessionId,
        params.imageKey,
        params.state,
        params.diffImageKey,
        params.misMatchPercentage,
        params.isSameDimensions
      );

      expect(photonService.testSession.update).toHaveBeenCalledWith({
        where: { id: params.testSessionId },
        data: {
          imageKey: params.imageKey,
          diffImageKey: params.diffImageKey,
          misMatchPercentage: params.misMatchPercentage,
          isSameDimensions: params.isSameDimensions,
          state: params.state
        }
      });
    });
  });
});
