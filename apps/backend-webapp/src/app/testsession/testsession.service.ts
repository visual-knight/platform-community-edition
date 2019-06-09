import { Injectable } from '@nestjs/common';
import { SignedTestSessionUrls } from './models/signed-urls';
import { PrismaService } from '../shared/prisma/prisma.service';
import gql from 'graphql-tag';
import { Config, S3 } from 'aws-sdk';
import { TestSessionWhereInput } from '@platform-community-edition/prisma';
import { environment } from '../../environments/environment';
import { TestSession } from './models/testsession';
import { merge } from 'lodash';
import { TestSessionWhereArgs } from './models/testsession-where.input';

const AWS_CONFIG = new Config({ region: environment.aws.region });

@Injectable()
export class TestsessionService {
  constructor(private prisma: PrismaService) {}

  updateTestSession(id: string) {
    throw new Error('Method not implemented.');
    return null;
  }
  deleteTestSession(testSessionId: string, id: string) {
    throw new Error('Method not implemented.');
    return null;
  }

  async testSession(
    testSessionId: string,
    userId: string
  ): Promise<TestSession> {
    const requestingUserHasAccess = await this.prisma.client.$exists.testSession(
      {
        id: testSessionId,
        variation: { test: { project: { users_some: { id: userId } } } }
      }
    );

    if (requestingUserHasAccess) {
      return this.prisma.client.testSession({ id: testSessionId });
    }
    throw new Error(
      'Invalid permissions, you do not have access to this testSession.'
    );
  }

  async testSessions(userId: string, where: TestSessionWhereArgs) {
    const userFilter: TestSessionWhereInput = {
      variation: { test: { project: { users_some: { id: userId } } } }
    };

    return this.prisma.client.testSessions({
      where: merge(where || {}, userFilter)
    });
  }

  async testSessionCount(
    userId: string,
    where: TestSessionWhereArgs
  ): Promise<number> {
    const userFilter: TestSessionWhereInput = {
      variation: { test: { project: { users_some: { id: userId } } } }
    };

    return this.prisma.client
      .testSessionsConnection({
        where: merge(where || {}, userFilter)
      })
      .aggregate()
      .count();
  }

  async getSignedUrls(testSessionId: string): Promise<SignedTestSessionUrls> {
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

  private async getTestSession(testSessionId: string): Promise<TestSession> {
    const testSession = await this.prisma.client.testSession({
      id: testSessionId
    });

    return testSession;
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
