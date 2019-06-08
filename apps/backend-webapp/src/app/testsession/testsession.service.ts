import { Injectable } from '@nestjs/common';
import { SignedTestSessionUrls } from './models/signed-urls';
import { PrismaService } from '../shared/prisma/prisma.service';
import gql from 'graphql-tag';
import { Config, S3 } from 'aws-sdk';
import {
  ContractUserAwsConfig,
  TestSessionWhereInput
} from '../../generated/prisma-client';
import { environment } from '../../environments/environment';
import { TestSession } from './models/testsession';
import { merge } from 'lodash';
import { TestSessionWhereArgs } from './models/testsession-where.input';

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

  async getSignedUrls(
    userId: string,
    testSessionId: string
  ): Promise<SignedTestSessionUrls> {
    const data = await this.getDataForSignedUrl(testSessionId, userId);

    const AWS_CONFIG = new Config({
      region: 'eu-central-1',
      accessKeyId: data.contractUserAwsConfig.accessKeyId,
      secretAccessKey: data.contractUserAwsConfig.secretAccessKey
    });

    const S3_INSTANCE = new S3(AWS_CONFIG);

    return {
      signedImageKey: data.testSession.imageKey
        ? this.createSignedUrl(
            S3_INSTANCE,
            data.contractId,
            data.testSession.imageKey,
            environment.s3.signedUrlExpireTime
          )
        : null,
      signedDiffImageKey: data.testSession.diffImageKey
        ? this.createSignedUrl(
            S3_INSTANCE,
            data.contractId,
            data.testSession.diffImageKey,
            environment.s3.signedUrlExpireTime
          )
        : null
    };
  }

  private async getDataForSignedUrl(testSessionId: string, userId: string) {
    const query = `
      query getData($userId: ID!, $testSessionId: ID!) {
        TestSession(id: $testSessionId) {
          imageKey
          diffImageKey
        }
        allContractUsers(filter: {users_some: {id: $userId}}) {
          id
          contractUserAwsConfig {
            secretAccessKey,
            accessKeyId
          }
        }
      }
    `;
    const testSession = await this.prisma.client.testSession({
      id: testSessionId
    });
    const user = await this.prisma.client.user({ id: userId }).$fragment<{
      contractUser: {
        id: string;
        contractUserAwsConfig: ContractUserAwsConfig;
      };
    }>(
      gql`
        query {
          contractUser {
            id
            contractUserAwsConfig {
              accessKeyId
              secretAccessKey
            }
          }
        }
      `
    );

    if (!user.contractUser && user.contractUser.contractUserAwsConfig) {
      throw new Error('You have no contractUserAwsConfig');
    }

    return {
      testSession,
      contractId: user.contractUser.id,
      contractUserAwsConfig: user.contractUser.contractUserAwsConfig
    };
  }

  private createSignedUrl(
    S3_INSTANCE: S3,
    Bucket: string,
    Key: string,
    Expires: number = 60
  ): string {
    const params = { Bucket, Key, Expires };
    return S3_INSTANCE.getSignedUrl('getObject', params);
  }
}
