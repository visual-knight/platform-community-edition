import { Injectable } from '@nestjs/common';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';
import {
  DesiredCapabilities,
  getBrowserAndDevice
} from '../../shared/services/browser-and-devices';
import { Test, TestSession } from '@generated/photonjs';
import { Observable, defer, zip, range, timer } from 'rxjs';
import { TestSessionComparison } from '../models/testsession-comparison';
import { map, retryWhen, mergeMap, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ComparisonService {
  constructor(
    private photonService: PhotonService,
    private cloudProviderService: CloudProviderService
  ) {}

  async testSession(testSessionId: string) {
    return this.photonService.testSessions.findOne({
      where: { id: testSessionId },
      include: {
        variation: {
          include: {
            baseline: true
          }
        }
      }
    });
  }

  testSessionWatch(testSessionId: string): Observable<TestSessionComparison> {
    return defer(() => this.testSession(testSessionId)).pipe(
      map(testSession => {
        if (
          ((testSession.misMatchPercentage === null &&
            testSession.variation.baseline !== null) ||
            (testSession.misMatchPercentage === null &&
              testSession.autoBaseline === true)) &&
          testSession.isSameDimensions !== false
        ) {
          console.log('No misMatchPercentage yet');
          throw new Error('No misMatchPercentage yet');
        }

        return {
          ...testSession,
          link: `${environment.appDomain}/variation/${testSession.variation.id}`
        };
      }),
      retryWhen(errors =>
        zip(range(1, 100), errors).pipe(mergeMap(i => timer(400)))
      )
    );
  }

  async getOrCreateProject(projectName: string): Promise<string> {
    const projects = await this.photonService.projects({
      where: { OR: [{ name: projectName }, { id: projectName }] }
    });

    if (projects.length > 0) {
      return projects[0].id;
    }

    const createdProject = await this.photonService.projects.create({
      data: {
        name: projectName
      }
    });

    return createdProject.id;
  }

  async loadTestData(projectId: string, testName: string) {
    const tests = await this.photonService.tests({
      where: { name: testName, project: { id: projectId } }
    });

    return tests.length > 0 ? tests[0] : null;
  }

  async invokeTestSession(
    testname: string,
    project: string,
    misMatchTolerance: number,
    capabilities: DesiredCapabilities,
    autoBaseline: boolean
  ) {
    const { browserName, deviceName } = getBrowserAndDevice(capabilities);
    console.log(`Detected browser: ${browserName} and device: ${deviceName}`);
    const projectId = await this.getOrCreateProject(project);
    let test: Test = await this.loadTestData(projectId, testname);
    if (!test) {
      test = { name: testname } as Test;
    }

    console.log(`Create test session for user`);

    try {
      const testSessionId = await this.createTestSession(
        test,
        projectId,
        deviceName,
        browserName,
        misMatchTolerance,
        autoBaseline || false
      );

      console.log(`Created test session with id: ${testSessionId}`);
      return testSessionId;
    } catch (error) {
      return { message: `Can't create test session`, stack: error };
    }
  }

  async createTestSession(
    test: Test,
    projectId: string,
    deviceName: string | null = null,
    browserName: string | null = null,
    misMatchTolerance: number,
    autoBaseline: boolean
  ) {
    let testSession: TestSession;

    if (test.id) {
      const [variation] = await this.photonService.variations({
        where: {
          test: { id: test.id },
          AND: [
            { deviceName: { equals: deviceName } },
            { browserName: { equals: browserName } }
          ]
        }
      });

      try {
        if (variation) {
          // create test session and connect
          console.log('// create test session and connect');
          testSession = await this.photonService.testSessions.create({
            data: {
              misMatchTolerance,
              autoBaseline,
              variation: {
                connect: { id: variation.id }
              }
            }
          });
        } else {
          // create test session and variation
          console.log('// create test session and variation');
          testSession = await this.photonService.testSessions.create({
            data: {
              misMatchTolerance,
              autoBaseline,
              variation: {
                create: {
                  browserName,
                  deviceName,
                  test: { connect: { id: test.id } }
                }
              }
            }
          });
        }

        return testSession.id;
      } catch (error) {
        console.log(error);
      }
    } else {
      // create test, test session and variation
      console.log('// create test, test session and variation');
      testSession = await this.photonService.testSessions.create({
        data: {
          misMatchTolerance,
          autoBaseline,
          variation: {
            create: {
              browserName,
              deviceName,
              test: {
                create: {
                  name: test.name,
                  project: { connect: { id: projectId } }
                }
              }
            }
          }
        }
      });
    }

    return testSession.id;
  }

  uploadScreenshot(
    base64Image: string,
    testSessionId: string
  ): Observable<boolean> {
    return this.cloudProviderService
      .saveScreenshotImage(
        Buffer.from(base64Image, 'base64'),
        `${testSessionId}.png`
      )
      .pipe(
        tap(
          () => {
            // TODO: start update test session state
          },
          err => {}
        )
      );
  }
}
