import { Injectable } from '@nestjs/common';
import { TestSessionType } from './models/testsession';
import { merge } from 'lodash';
import { TestSessionDataArgs } from './models/testsession-where.input';
import { AwsS3Service } from '../shared/aws/aws-s3.service';
import { PhotonService } from '@visual-knight/api-interface';
import { TestSessionState } from '@generated/photonjs';

@Injectable()
export class TestsessionService {
  constructor(
    private photonService: PhotonService,
    private s3Service: AwsS3Service
  ) {}

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

    const images = [deleted.imageKey, deleted.diffImageKey].filter(
      val => !!val
    );
    try {
      await this.s3Service.deleteS3Images(images);
    } catch (err) {
      console.log(err);
    }
    return deleted;
  }

  async testSession(testSessionId: string) {
    return this.photonService.testSessions.findOne({
      where: { id: testSessionId }
    });
  }

  async testSessions(where: TestSessionDataArgs) {
    return this.photonService.testSessions.findMany({
      where: merge(where || {}),
      include: {
        baselineRef: true
      }
    });
  }

  async testSessionCount(where: TestSessionDataArgs): Promise<number> {
    return (await this.testSessions(where)).length;
  }

  async rejectTestSession(testSessionId: string, comment: string) {
    return this.photonService.testSessions.update({
      where: { id: testSessionId },
      data: {
        state: TestSessionState.DECLINED,
        stateComment: comment
      }
    });
  }
}
