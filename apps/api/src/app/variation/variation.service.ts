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
  async getVariationsCount(): Promise<number> {
    return (await this.getVariations()).length;
  }
  async getVariations() {
    return this.photonService.variations.findMany({
      include: { testSessions: true }
    });
  }
  async getVariation(variationId: string) {
    return this.photonService.variations.findOne({
      where: { id: variationId },
      include: {
        testSessions: true
      }
    });
  }
}
