import { Injectable } from '@nestjs/common';
import { PhotonService } from '@visual-knight/api-interface';
import { TestSessionState } from '@generated/photonjs';

@Injectable()
export class VariationService {
  constructor(private photonService: PhotonService) {}

  async deleteVariation(variationId: string) {
    return this.photonService.variations.delete({
      where: { id: variationId },
      include: { testSessions: true }
    });
  }
  async getVariationsCount(testId: string): Promise<number> {
    return (await this.getVariations(testId)).length;
  }
  async getVariations(testId: string) {
    return this.photonService.variations.findMany({
      where: { test: { id: testId } },
      include: { baseline: true, testSessions: true }
    });
  }
  async getVariation(variationId: string) {
    return this.photonService.variations.findOne({
      where: { id: variationId },
      include: { baseline: true, testSessions: true }
    });
  }

  async acceptNewBaseline(
    variationId: string,
    testSessionId: string,
    comment: string
  ) {
    return this.photonService.variations.update({
      where: { id: variationId },
      data: {
        baseline: { connect: { id: testSessionId } },
        testSessions: {
          update: {
            where: { id: testSessionId },
            data: { state: TestSessionState.ACCEPTED, stateComment: comment }
          }
        }
      },
      include: {
        baseline: true,
        testSessions: true
      }
    });
  }
}
