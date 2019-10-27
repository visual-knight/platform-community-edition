import { Injectable } from '@angular/core';
import { TestSessionType } from '../types';

@Injectable({ providedIn: 'root' })
export class TestHelperService {
  constructor() {

  }

  isTestSuccessfull(testSession: TestSessionType) {
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
