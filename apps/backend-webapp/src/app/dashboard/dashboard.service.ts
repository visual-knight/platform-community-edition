import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import gql from 'graphql-tag';
import { TestSession, User } from '@platform-community-edition/prisma';
import { flattenDeep, orderBy } from 'lodash';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getDashboardData(user: User) {
    try {
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
        projectsSuccess: this.getProjectsSuccess(projects),
        recentTests: await this.getRecentTests(projects),
        testStatistics: this.getTestStatistic(projects)
      };
    } catch (e) {
      console.log(e);
      return null;
    }
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
            success: test.variations.every(
              // TODO: Could be possible that this is not working -> async
              async variation =>
                await this.isSucessfullTestsession(variation.testSessions[0])
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

  private async isSucessfullTestsession(
    testSession: TestSession
  ): Promise<boolean> {
    return (
      (testSession.imageKey !== null &&
        testSession.misMatchPercentage !== null &&
        testSession.misMatchPercentage <= testSession.misMatchTolerance) ||
      (testSession.misMatchPercentage === null &&
        !!(await this.prisma.client
          .testSession({ id: testSession.id })
          .baselineRef()))
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
