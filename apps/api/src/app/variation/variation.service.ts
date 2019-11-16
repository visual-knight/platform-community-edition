import { Injectable } from '@nestjs/common';
import { PhotonService, CloudProviderService } from '@visual-knight/api-interface';
import { TestSessionState, User } from '@generated/photonjs';

@Injectable()
export class VariationService {
  constructor(private photonService: PhotonService, private cloudService: CloudProviderService) {}

  async deleteVariation(variationId: string) {
    const testSessionImages = (await this.photonService.testSessions.findMany({
      where: {
        variation: {
          id: variationId
        }
      },
      select: {
        imageKey: true,
        diffImageKey: true
      }
    }))
      .flatMap(images => [images.imageKey, images.diffImageKey])
      .filter(val => !!val);
    await this.photonService.testSessions.deleteMany({
      where: {
        variation: {
          id: variationId
        }
      }
    });

    try {
      await Promise.all(testSessionImages.map(image => this.cloudService.deleteScreenshotImage(image)));
    } catch (err) {
      console.log(err);
      console.log('Unable to delete screenshots. Please do it manually! ', testSessionImages);
    }

    return this.photonService.variations.delete({
      where: { id: variationId },
      include: {
        testSessions: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
  }
  async getVariationsCount(testId: string): Promise<number> {
    return (await this.getVariations(testId)).length;
  }
  async getVariations(testId: string) {
    return this.photonService.variations.findMany({
      where: { test: { id: testId } },
      include: {
        baseline: true,
        testSessions: {
          include: {
            stateChangedByUser: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
  }
  async getVariation(variationId: string) {
    return this.photonService.variations.findOne({
      where: { id: variationId },
      include: {
        baseline: true,
        testSessions: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            stateChangedByUser: true
          }
        }
      }
    });
  }

  async acceptNewBaseline(variationId: string, testSessionId: string, comment: string, user: User) {
    return this.photonService.variations.update({
      where: { id: variationId },
      data: {
        baseline: { connect: { id: testSessionId } },
        testSessions: {
          update: {
            where: { id: testSessionId },
            data: {
              state: TestSessionState.ACCEPTED,
              stateComment: comment,
              stateChangedByUser: {
                connect: {
                  id: user.id
                }
              }
            }
          }
        }
      },
      include: {
        baseline: true,
        testSessions: {
          include: {
            stateChangedByUser: true
          },
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
  }
}
