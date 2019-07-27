import { Injectable } from '@nestjs/common';
import { SignedTestSessionUrls } from './models/signed-urls';
import { Config, S3 } from 'aws-sdk';
import { environment } from '../../environments/environment';
import { TestSession } from './models/testsession';
import { merge } from 'lodash';
import { TestSessionWhereArgs } from './models/testsession-where.input';
import {
  PhotonService,
  TestSessionWhereInput,
  TestSessionUpdateInput
} from '@platform-community-edition/prisma2';
import { AwsS3Service } from '../shared/aws/aws-s3.service';

const AWS_CONFIG = new Config({ region: environment.aws.region });

@Injectable()
export class TestsessionService {
  constructor(
    private photonService: PhotonService,
    private s3Service: AwsS3Service
  ) {}

  async updateTestSession(
    testSessionId: number,
    userId: number,
    data: TestSessionUpdateInput
  ) {
    const requestingUserHasAccess = await this.photonService.testSessions
      .findOne({
        where: { id: testSessionId }
      })
      .variation()
      .test()
      .project()
      .users({ where: { id: userId } });

    if (requestingUserHasAccess) {
      return this.photonService.testSessions.update({
        data,
        where: {
          id: testSessionId
        }
      });
    }

    throw new Error(
      'Invalid permissions, you do not have access to this testSession.'
    );
  }
  async deleteTestSession(testSessionId: number, userId: number) {
    const requestingUserHasAccess = await this.photonService.testSessions
      .findOne({
        where: { id: testSessionId }
      })
      .variation()
      .test()
      .project()
      .users({ where: { id: userId } });

    if (requestingUserHasAccess) {
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

    throw new Error(
      'Invalid permissions, you do not have access to this testSession.'
    );
  }

  async testSession(
    testSessionId: number,
    userId: number
  ): Promise<TestSession> {
    const requestingUserHasAccess = await this.photonService.testSessions
      .findOne({
        where: { id: testSessionId }
      })
      .variation()
      .test()
      .project()
      .users({ where: { id: userId } });

    if (requestingUserHasAccess.length > 0) {
      return this.photonService.testSessions.findOne({
        where: { id: testSessionId }
      });
    }
    throw new Error(
      'Invalid permissions, you do not have access to this testSession.'
    );
  }

  async testSessions(userId: number, where: TestSessionWhereArgs) {
    const userFilter: TestSessionWhereInput = {
      variation: { test: { project: { users: { some: { id: userId } } } } }
    };

    return this.photonService.testSessions.findMany({
      where: merge(where || {}, userFilter)
    });
  }

  async testSessionCount(
    userId: number,
    where: TestSessionWhereArgs
  ): Promise<number> {
    const userFilter: TestSessionWhereInput = {
      variation: { test: { project: { users: { some: { id: userId } } } } }
    };

    return (await this.photonService.testSessions.findMany({
      where: merge(where || {}, userFilter)
    })).length;
  }

  async getSignedUrls(testSessionId: number): Promise<SignedTestSessionUrls> {
    const testSession = await this.getTestSession(testSessionId);
    const S3_INSTANCE = new S3(AWS_CONFIG);

    return {
      signedImageKey: testSession.imageKey
        ? this.createSignedUrl(
            S3_INSTANCE,
            testSession.imageKey,
            environment.s3.signedUrlExpireTime
          )
        : null,
      signedDiffImageKey: testSession.diffImageKey
        ? this.createSignedUrl(
            S3_INSTANCE,
            testSession.diffImageKey,
            environment.s3.signedUrlExpireTime
          )
        : null
    };
  }

  private async getTestSession(testSessionId: number): Promise<TestSession> {
    return this.photonService.testSessions.findOne({
      where: {
        id: testSessionId
      }
    });
  }

  private createSignedUrl(
    S3_INSTANCE: S3,
    Key: string,
    Expires: number = 60
  ): string {
    const params = { Bucket: environment.aws.s3BucketName, Key, Expires };
    return S3_INSTANCE.getSignedUrl('getObject', params);
  }
}
