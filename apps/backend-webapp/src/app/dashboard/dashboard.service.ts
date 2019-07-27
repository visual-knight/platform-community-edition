import { Injectable } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import gql from 'graphql-tag';
import { flattenDeep, orderBy } from 'lodash';
import {
  PhotonService,
  User,
  Variation,
  TestSession
} from '@platform-community-edition/prisma2';

@Injectable()
export class DashboardService {
  constructor(private photonService: PhotonService) {}

  async getDashboardData(user: User) {
    try {
      const projects = await this.photonService.projects.findMany({
        where: { users: { some: { id: user.id } } },
        select: {
          id: true,
          name: true,
          tests: {
            select: {
              id: true,
              name: true,
              variations: {
                orderBy: { createdAt: 'desc' },
                select: {
                  baseline: true,
                  testSessions: {
                    orderBy: { createdAt: 'desc' },
                    first: 1,
                    select: {
                      state: true,
                      misMatchPercentage: true,
                      misMatchTolerance: true,
                      imageKey: true,
                      updatedAt: true,
                      baselineRef: true
                    }
                  }
                }
              }
            }
          }
        }
      });

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
            success: test.variations.every(variation =>
              this.isSucessfullTestsession(variation)
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

  private isSucessfullTestsession(variation: {
    baseline: TestSession;
    testSessions: {
      updatedAt: string;
      state: 'PENDING' | 'UNRESOLVED' | 'ACCEPTED' | 'DECLINED';
      misMatchPercentage: number;
      misMatchTolerance: number;
      imageKey: string;
      baselineRef: Variation;
    }[];
  }): boolean {
    const testSession = variation.testSessions[0];
    return (
      (testSession.imageKey !== null &&
        testSession.misMatchPercentage !== null &&
        testSession.misMatchPercentage <= testSession.misMatchTolerance) ||
      (testSession.misMatchPercentage === null && !!variation.baseline)
    );
  }
}

interface DashboardProjectFragment {
  id: number;
  name: string;
  tests: {
    id: number;
    name: string;
    variations: {
      baseline: TestSession;
      testSessions: {
        updatedAt: string;
        state: 'PENDING' | 'UNRESOLVED' | 'ACCEPTED' | 'DECLINED';
        misMatchPercentage: number;
        misMatchTolerance: number;
        imageKey: string;
        baselineRef: Variation;
      }[];
    }[];
  }[];
}
