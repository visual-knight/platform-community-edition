import { Test } from '../../shared/models/test.model';
import { Variation } from '../../shared/models/variation.model';

export interface TestStateModel {
  list: Test[];
  selectedTestId: string;
  selectedTestSessionId: string;
  selectedVariation: Variation;
  selectedVariationList: Variation[];
  imageStore: string;
}
