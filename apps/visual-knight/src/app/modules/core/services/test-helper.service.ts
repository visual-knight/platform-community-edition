import { Injectable } from '@angular/core';
import { TestSession } from '@generated/photonjs';

@Injectable({ providedIn: 'root' })
export class TestHelperService {
  constructor() {}

  isTestSuccessfull(testSession: TestSession) {
    return (
      (testSession.imageKey !== null &&
        testSession.misMatchPercentage !== null &&
        testSession.misMatchPercentage <= testSession.misMatchTolerance) ||
      (testSession.misMatchPercentage === null
        // TODO: how to resolve with prisma 2
        // && !!testSession.baselineRef
        )
    );
  }
}
