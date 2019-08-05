import { Test } from '../../shared/models/test.model';
import { Variation } from '../../shared/models/variation.model';

export class TestSubscribeAction {
  static readonly type = '[Test] Subscribe tests';
}

export class TestsLoadedAction {
  static readonly type = '[Test] tests Loaded';
  constructor(public payload: Test[]) {}
}

export class TestDeleteAction {
  static readonly type = '[Test] Delete';
  constructor(public payload: Test) {}
}

export class VariationLoadAction {
  static readonly type = '[Test] Load variation';

  constructor(public payload: string) {}
}

export class SetVariationAction {
  static readonly type = '[Test] Set variation';

  constructor(public payload: Variation) {}
}

export class VariationListLoadAction {
  static readonly type = '[Test] Load variation list';

  constructor(public payload: string) {}
}

export class SelectTestIdAction {
  static readonly type = '[Test] Select';

  constructor(public payload: string) {}
}

export class SelectTestSessionIdAction {
  static readonly type = '[Test] Select TestSession';

  constructor(public payload: string) {}
}

export class DeleteVariationAction {
  static readonly type = '[Test] Delete variation';

  constructor(public payload: Variation) {}
}

export class DeleteTestSessionAction {
  static readonly type = '[Test] Delete testsession';

  constructor(public payload: string) {}
}

export class AcceptNewBaselineAction {
  static readonly type = '[Test] Accept new baseline';

  constructor(public payload: { testSessionId: string; variationId: string; comment: string }) {}
}

export class DeclineTestSessionAction {
  static readonly type = '[Test] Decline test session';

  constructor(public payload: { testSessionId: string; comment: string }) {}
}
