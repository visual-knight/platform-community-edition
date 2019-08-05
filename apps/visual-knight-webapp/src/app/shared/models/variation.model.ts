import { TestSession } from './testsession.model';

export interface Variation {
  additionalData: Object;
  baselineVariationRef: TestSession;
  browserName: String;
  createdAt: Date;
  deviceName: String;
  id: string;
  testSessions: TestSession[];
  updatedAt: Date;
  isLastTestSuccessfull: boolean;
}
