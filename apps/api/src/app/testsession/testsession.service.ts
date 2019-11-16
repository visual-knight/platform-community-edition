import { Injectable } from '@nestjs/common';
import { merge } from 'lodash';
import { TestSessionDataArgs } from './models/testsession-where.input';
import { PhotonService, CloudProviderService } from '@visual-knight/api-interface';
import { TestSessionState, User } from '@generated/photonjs';

@Injectable()
export class TestsessionService {
  constructor(private photonService: PhotonService, private cloudService: CloudProviderService) {}

  async updateTestSession(testSessionId: string, data: TestSessionDataArgs) {
    return this.photonService.testSessions.update({
      data,
      where: {
        id: testSessionId
      }
    });
  }
  async deleteTestSession(testSessionId: string) {
    const deleted = await this.photonService.testSessions.delete({
      where: {
        id: testSessionId
      }
    });

    const images = [deleted.imageKey, deleted.diffImageKey].filter(val => !!val);
    try {
      await Promise.all(images.map(image => this.cloudService.deleteScreenshotImage(image)));
    } catch (err) {
      console.log(err);
      console.log('Unable to delete screenshots. Please do it manually! ', images);
    }
    return deleted;
  }

  async testSession(testSessionId: string) {
    return this.photonService.testSessions.findOne({
      where: { id: testSessionId },
      include: {
        baselineRef: true,
        stateChangedByUser: true
      }
    });
  }

  async testSessions(where: TestSessionDataArgs) {
    return this.photonService.testSessions.findMany({
      where: merge(where || {}),
      include: {
        baselineRef: true,
        stateChangedByUser: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  }

  async testSessionCount(where: TestSessionDataArgs): Promise<number> {
    return (await this.testSessions(where)).length;
  }

  async rejectTestSession(testSessionId: string, comment: string, user: User) {
    return this.photonService.testSessions.update({
      where: { id: testSessionId },
      data: {
        state: TestSessionState.DECLINED,
        stateComment: comment,
        stateChangedByUser: {
          connect: {
            id: user.id
          }
        }
      }
    });
  }
}
