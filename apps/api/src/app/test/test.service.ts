import { Injectable } from '@nestjs/common';
import { PhotonService } from '@visual-knight/api-interface';

@Injectable()
export class TestService {
  constructor(private photonService: PhotonService) {}

  async deleteTest(testId: string) {
    return this.photonService.tests.delete({
      where: { id: testId },
      include: {
        project: true,
        variations: { include: { testSessions: true } }
      }
    });
  }
  async getTestsCount(): Promise<number> {
    return (await this.getTests()).length;
  }
  async getTests() {
    return this.photonService.tests.findMany({
      include: {
        variations: { include: { testSessions: true } },
        project: true
      }
    });
  }
  async getTest(testId: string) {
    return this.photonService.tests.findOne({
      where: { id: testId },
      include: {
        variations: { include: { testSessions: true } },
        project: true
      }
    });
  }
}
