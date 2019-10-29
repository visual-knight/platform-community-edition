import { Injectable } from '@nestjs/common';
import { PhotonService } from '@visual-knight/api-interface';

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
}
