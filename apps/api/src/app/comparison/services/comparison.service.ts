import { Injectable } from '@nestjs/common';
import {
  PhotonService,
  CloudProviderService
} from '@visual-knight/api-interface';
import {
  DesiredCapabilities,
  getBrowserAndDevice
} from '../../shared/services/browser-and-devices';
import { Test, TestSession, TestSessionState } from '@generated/photonjs';
import {
  Observable,
  defer,
  zip,
  range,
  timer,
  combineLatest,
  Subject,
  of,
  from
} from 'rxjs';
import { TestSessionComparison } from '../models/testsession-comparison';
import { map, retryWhen, tap, switchMap, mergeMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { CreateDiffResult } from '../models/diffresult.model';
import { PNG } from 'pngjs';
import Pixelmatch from 'pixelmatch';

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
            baseline: true,
            test: true
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
          throw new Error('No misMatchPercentage yet');
        }

        return {
          ...testSession,
          link: `${environment.appDomain}variation/${
            testSession.variation.test.id
          }/${testSession.variation.id}?testSessionId=${testSession.id}`
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
  ): Observable<TestSession> {
    return this.cloudProviderService
      .saveScreenshotImage(
        Buffer.from(base64Image, 'base64'),
        `${testSessionId}.screenshot.png`
      )
      .pipe(
        switchMap(() =>
          from(
            this.photonService.testSessions
              .update({
                where: { id: testSessionId },
                data: { imageKey: `${testSessionId}.screenshot.png` }
              })
              .then()
          )
        ),
        switchMap(() => this.processTestSessionImage(testSessionId))
      );
  }

  createDiff(
    srcImageFilename: string,
    baselineImageFilename: string,
    testSessionId: string
  ): Observable<CreateDiffResult> {
    return combineLatest(
      this.cloudProviderService.loadImage(baselineImageFilename),
      this.cloudProviderService.loadImage(srcImageFilename)
    ).pipe(
      switchMap(([baselineImage, srcImage]) => {
        const baseline = PNG.sync.read(baselineImage);
        const test = PNG.sync.read(srcImage);
        const isSameDimensions =
          baseline.width === test.width && baseline.height === test.height;

        if (!isSameDimensions) {
          return of({
            isSameDimensions
          });
        }

        const diffImageKey = `${testSessionId}.diff.png`;
        const diff = new PNG({
          width: baseline.width,
          height: baseline.height
        });
        const pixelMisMatchCount = Pixelmatch(
          baseline.data,
          test.data,
          diff.data,
          baseline.width,
          baseline.height,
          {
            threshold: environment.diffOptions.threshold,
            includeAA: environment.diffOptions.includeAA
          }
        );

        const subject: Subject<Buffer> = new Subject();
        diff.pack();
        const chunks = [];
        diff.on('data', function(chunk) {
          chunks.push(chunk);
        });
        diff.on('end', function() {
          subject.next(Buffer.concat(chunks));
          subject.complete();
        });

        return subject.asObservable().pipe(
          switchMap(buffer => {
            return this.cloudProviderService
              .saveScreenshotImage(buffer, diffImageKey)
              .pipe(
                switchMap(() =>
                  from(
                    this.photonService.testSessions
                      .update({
                        where: { id: testSessionId },
                        data: { imageKey: diffImageKey }
                      })
                      .then()
                  )
                ),
                map(() => ({
                  misMatchPercentage:
                    (pixelMisMatchCount * 100) /
                    (baseline.width * baseline.height) /
                    100,
                  isSameDimensions,
                  diffImageKey
                }))
              );
          })
        );
      })
    );
  }

  private processTestSessionImage(
    testSessionId: string
  ): Observable<TestSession> {
    return this.loadTestSessionData(testSessionId).pipe(
      switchMap(
        ({
          misMatchTolerance,
          baselineRef,
          autoBaseline,
          variationId,
          testSession
        }) => {
          if (baselineRef) {
            console.log(`Create diff`);
            return this.createDiff(
              testSession.imageKey,
              baselineRef.imageKey,
              testSessionId
            ).pipe(
              switchMap(
                ({ misMatchPercentage, diffImageKey, isSameDimensions }) => {
                  console.log('Updated imaged data');
                  return this.updateImageData(
                    testSessionId,
                    testSession.imageKey,
                    misMatchTolerance < misMatchPercentage || !isSameDimensions
                      ? 'UNRESOLVED'
                      : 'ACCEPTED',
                    diffImageKey,
                    baselineRef.id,
                    misMatchPercentage,
                    isSameDimensions
                  );
                }
              )
            );
          } else if (autoBaseline) {
            console.log('Update auto baseline');
            return this.updateAutoBaseline(
              testSession.imageKey,
              testSessionId,
              variationId
            );
          } else {
            console.log('No baseline image exists');
            return this.updateImageData(
              testSessionId,
              testSession.imageKey,
              'UNRESOLVED'
            );
          }
        }
      )
    );
  }

  updateAutoBaseline(
    imageKey: string,
    testSessionId: string,
    variationId: string
  ): Observable<any> {
    return from(
      this.photonService.variations
        .update({
          where: { id: variationId },
          data: {
            baseline: { connect: { id: testSessionId } },
            testSessions: {
              update: {
                where: { id: testSessionId },
                data: {
                  imageKey: imageKey,
                  isSameDimensions: true,
                  misMatchPercentage: 0,
                  state: 'ACCEPTED'
                }
              }
            }
          }
        })
        .then()
    );
  }

  private loadTestSessionData(testSessionId: string) {
    return from(
      this.photonService.testSessions.findOne({
        where: { id: testSessionId },
        include: {
          variation: {
            include: {
              baseline: true
            }
          }
        }
      })
    ).pipe(
      map(testSession => ({
        testSession,
        baselineRef: testSession.variation.baseline,
        misMatchTolerance: testSession.misMatchTolerance,
        autoBaseline: testSession.autoBaseline,
        variationId: testSession.variation.id
      }))
    );
  }

  private updateImageData(
    testSessionId: string,
    imageKey: string,
    state: TestSessionState,
    diffImageKey?: string,
    diffBaselineRef?: string,
    misMatchPercentage?: number,
    isSameDimensions?: boolean
  ): Observable<TestSession> {
    const testSession = this.photonService.testSessions.update({
      where: { id: testSessionId },
      data: {
        imageKey,
        diffImageKey,
        misMatchPercentage,
        isSameDimensions,
        state,
        baselineForDiffRef: diffBaselineRef
          ? { connect: { id: diffBaselineRef } }
          : null
      }
    });

    console.log('Update image data');
    return from(testSession.then());
  }
}
