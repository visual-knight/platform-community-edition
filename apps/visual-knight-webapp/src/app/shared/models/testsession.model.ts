import { Variation } from './variation.model';
export interface TestSession {
  createdAt: Date;
  diffImageKey: string;
  id: string;
  imageKey: string;
  misMatchPercentage: Number;
  misMatchTolerance: Number;
  updatedAt: Date;
  isSuccessfull?: boolean;
  baselineRef?: Variation;
  state: TestSessionState;
  autoBaseline: boolean;
  stateChangedByUser?: {
    email: string;
    forename: string;
    lastname: string;
  };
}

export enum TestSessionState {
  PENDING = 'PENDING',
  UNRESOLVED = 'UNRESOLVED',
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED'
}

export function getTestSessionUsername(testSession: TestSession): string {
  if (!testSession.stateChangedByUser && testSession.state === 'ACCEPTED') {
    return testSession.autoBaseline ? 'By System (autoBaseline)' : 'By System';
  }
  if (!testSession.stateChangedByUser) {
    return;
  }
  return testSession.stateChangedByUser.forename
    ? `${testSession.stateChangedByUser.forename} ${testSession.stateChangedByUser.lastname}`
    : testSession.stateChangedByUser.email;
}
