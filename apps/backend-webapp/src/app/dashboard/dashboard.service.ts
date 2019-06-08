import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import gql from 'graphql-tag';
import { AwsService, AwsApiGatewayService } from '../shared/aws';
import { ProductService } from '../shared/product/product.service';
import { TestSession } from '../../generated/prisma-client';
import { flattenDeep, orderBy } from 'lodash';

@Injectable()
export class DashboardService {
  constructor(
    private prisma: PrismaService,
    private awsService: AwsService,
    private awsApiGatewayService: AwsApiGatewayService,
    private productService: ProductService
  ) {}

  async getDashboardData(user: any) {
    try {
      const userData = await this.prisma.client
        .user({ id: user.id })
        .$fragment<DashboardUserFragment>(
          gql`
            query {
              contractUserOwner {
                contractUserAwsConfig {
                  apiKeyId
                }
                planStripeId
              }
            }
          `
        );

      const projects = await this.prisma.client
        .projects({ where: { users_some: { id: user.id } } })
        .$fragment<DashboardProjectFragment[]>(
          gql`
            query {
              id
              name
              tests {
                id
                name
                variations(orderBy: createdAt_DESC) {
                  testSessions(orderBy: createdAt_DESC, first: 1) {
                    updatedAt
                    state
                    imageKey
                    misMatchPercentage
                    misMatchTolerance
                    baselineRef {
                      id
                    }
                  }
                }
              }
            }
          `
        );

      return {
        api: await this.getApiUsageData(userData),
        projectsSuccess: this.getProjectsSuccess(projects),
        recentTests: await this.getRecentTests(projects),
        testStatistics: this.getTestStatistic(projects)
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  private async getApiUsageData(
    userData: DashboardUserFragment
  ): Promise<{ used: number; remaining: number; totalQuota: number }> {
    const usagePlan = this.awsService.getAwsUsagePlanByProduct(
      this.productService.findProductByPlanId(
        userData.contractUserOwner.planStripeId
      )
    );
    return await this.awsApiGatewayService.getApiUsage(
      usagePlan,
      userData.contractUserOwner.contractUserAwsConfig.apiKeyId
    );
  }

  private getProjectsSuccess(projects: DashboardProjectFragment[]) {
    const projectsSuccess = [];

    projects.forEach(project => {
      const failedTests = project.tests.filter(
        test =>
          test.variations.filter(
            variation =>
              variation.testSessions.filter(
                session => session.state === 'UNRESOLVED'
              ).length > 0
          ).length > 0
      );

      projectsSuccess.push({
        totalTests: project.tests.length,
        failedTests: failedTests.length,
        name: project.name,
        id: project.id
      });
    });

    return projectsSuccess;
  }

  private getTestStatistic(projects: DashboardProjectFragment[]) {
    let countFailedVariations = 0,
      countWaitingForReview = 0,
      countVariations = 0;
    projects.forEach(project => {
      project.tests.forEach(test =>
        test.variations.forEach(variation => {
          countVariations++;
          variation.testSessions.forEach(testSession => {
            if (testSession.state === 'DECLINED') {
              countFailedVariations++;
            }
            if (testSession.state === 'UNRESOLVED') {
              countWaitingForReview++;
            }
          });
        })
      );
    });

    return {
      countFailedVariations,
      countVariations,
      countWaitingForReview
    };
  }

  private async getRecentTests(projects: DashboardProjectFragment[]) {
    let allTests = flattenDeep(
      projects.map(project => {
        const tests = project.tests.map(test => {
          return {
            id: test.id,
            name: test.name,
            success: test.variations.every(variation =>
              this.isSucessfullTestsession(variation.testSessions[0])
            ),
            lastUpdate: test.variations
              .map(variation => variation.testSessions[0].updatedAt)
              .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
          };
        });
        return tests;
      })
    );

    if (allTests.length > 4) {
      allTests = orderBy(allTests, ['lastUpdate'], ['desc']).slice(0, 4);
    }

    return allTests;
  }

  // TODO!: check why baseref is not available
  // private isSucessfullTestsession(testSession: TestSession): boolean {
  //   return (
  //     (testSession.imageKey !== null &&
  //       testSession.misMatchPercentage !== null &&
  //       testSession.misMatchPercentage <= testSession.misMatchTolerance) ||
  //     (testSession.misMatchPercentage === null && !!testSession.baselineRef)
  //   );
  // }
  private isSucessfullTestsession(testSession: TestSession): boolean {
    return (
      testSession.imageKey !== null &&
      testSession.misMatchPercentage !== null &&
      testSession.misMatchPercentage <= testSession.misMatchTolerance
    );
  }
}

interface DashboardProjectFragment {
  id: string;
  name: string;
  tests: {
    id: string;
    name: string;
    variations: {
      testSessions: TestSession[];
    }[];
  }[];
}

interface DashboardUserFragment {
  contractUserOwner: {
    contractUserAwsConfig: {
      apiKeyId: string;
    };
    planStripeId: string;
  };
}
