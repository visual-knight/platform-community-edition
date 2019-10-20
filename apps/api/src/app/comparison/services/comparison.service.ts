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

  async uploadScreenshot(
    base64Image: string,
    testSessionId: string
  ): Promise<boolean> {
    return this.cloudProviderService.saveScreenshotImage(
      Buffer.from(base64Image, 'base64'),
      `${testSessionId}.png`
    );
  }
}
