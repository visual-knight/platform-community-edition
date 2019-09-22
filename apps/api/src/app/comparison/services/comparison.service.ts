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
        browserName,
        deviceName,
        misMatchTolerance,
        autoBaseline || false
      );

      console.log(`Created test session with id: ${testSessionId}`);
      const url = this.getScreenshotUploadUrl(testSessionId);
      console.log(`Signed url created: ${url}`);
      return { url, testSessionId };
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
      const variations = await this.photonService.variations({
        where: { test: { id: test.id }, deviceName, browserName }
      });

      // create test session and connect to existing variation
      if (variations.length > 0) {
        testSession = await this.photonService.testSessions.create({
          data: {
            misMatchTolerance,
            autoBaseline,
            variation: {
              connect: { id: variations[0].id }
            }
          }
        });
      } else {
        // create test session and variation
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
    } else {
      // create test, test session and variation
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

  async getScreenshotUploadUrl(testSessionId: string): Promise<string> {
    return await this.cloudProviderService.generateScreenshotUploadUrl();
  }
}
