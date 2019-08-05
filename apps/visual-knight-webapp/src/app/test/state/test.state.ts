import { State, NgxsOnInit, Selector, StateContext, Action, Actions, ofActionSuccessful } from '@ngxs/store';
import { TestStateModel } from './test.state.model';
import { TestSession, TestSessionState } from '../../shared/models/testsession.model';
import {
  TestSubscribeAction,
  TestsLoadedAction,
  VariationLoadAction,
  SelectTestSessionIdAction,
  VariationListLoadAction,
  AcceptNewBaselineAction,
  DeclineTestSessionAction,
  SetVariationAction,
  DeleteTestSessionAction,
  TestDeleteAction,
  DeleteVariationAction,
  SelectTestIdAction
} from './test.actions';
import { merge, remove, find, cloneDeep } from 'lodash-es';
import { TestService } from '../test.service';
import { QueryRef } from 'apollo-angular';
import { AllTestsQueryResponse } from '../test.graphql';

@State<TestStateModel>({
  name: 'test',
  defaults: {
    list: [{}, {}, {}, {}, {}] as any, // init empty for loader
    selectedTestId: null,
    selectedTestSessionId: null,
    selectedVariation: null,
    selectedVariationList: null,
    imageStore: null
  }
})
export class TestState implements NgxsOnInit {
  private testsSupscription: QueryRef<AllTestsQueryResponse, Record<string, any>>;

  constructor(private testService: TestService, private actions$: Actions) {}

  @Selector()
  static selectedTestId(state: TestStateModel) {
    return state.selectedTestId;
  }

  @Selector()
  static selectedTest(state: TestStateModel) {
    if (state.selectedTestSessionId) {
      return state.list.find(
        test =>
          test.variations.find(
            variation =>
              variation.testSessions.find(testSession => testSession.id === state.selectedTestSessionId) !== undefined
          ) !== undefined
      );
    }
    return state.list.find(test => test.id === state.selectedTestId);
  }

  @Selector()
  static testList(state: TestStateModel) {
    return state.list;
  }

  @Selector()
  static selectedTestSessionId(state: TestStateModel) {
    return state.selectedTestSessionId;
  }

  @Selector()
  static selectedVaration(state: TestStateModel) {
    return state.selectedVariation;
  }

  @Selector()
  static selectedVarationList(state: TestStateModel) {
    return state.selectedVariationList;
  }

  @Selector()
  static selectedTestSession(state: TestStateModel) {
    return state.selectedVariation
      ? find(state.selectedVariation.testSessions, { id: state.selectedTestSessionId })
      : null;
  }

  @Selector()
  static testSessions(state: TestStateModel) {
    return state.selectedVariation.testSessions;
  }

  @Action(TestSubscribeAction)
  subscribeToProject({ dispatch }: StateContext<TestStateModel>) {
    this.testsSupscription = this.testService.testsSubscription();
    this.testsSupscription.valueChanges.subscribe(({ data }) => {
      dispatch(new TestsLoadedAction(data.tests));
    });
  }

  @Action(TestsLoadedAction)
  testsLoaded({ patchState }: StateContext<TestStateModel>, { payload }: TestsLoadedAction) {
    const list = payload.map(test => {
      const successfullVariations = test.variations.filter(variation => {
        const lastTestSession = variation.testSessions[0];
        return this.isSucessfull(lastTestSession);
      }).length;

      return merge({}, test, {
        successfullVariations: successfullVariations,
        failedVariations: test.variations.length - successfullVariations
      });
    });

    patchState({
      list
    });
  }

  @Action(VariationLoadAction)
  async loadVariation({ patchState, dispatch }: StateContext<TestStateModel>, { payload }: VariationLoadAction) {
    patchState({ selectedVariationList: null });
    try {
      const variation = await this.testService.getVariation(payload).toPromise();

      dispatch(new SetVariationAction(variation));
      return dispatch(new SelectTestSessionIdAction(variation.testSessions[0].id));
    } catch (error) {
      console.error(error);
    }
  }

  @Action(SetVariationAction)
  setVariation({ patchState }: StateContext<TestStateModel>, { payload }: SetVariationAction) {
    const testSessions = payload.testSessions.map(testSession => {
      return merge({}, testSession, {
        isSuccessfull: this.isSucessfull(testSession)
      });
    });
    const isLastTestSuccessfull = testSessions[0].isSuccessfull;
    const selectedVariation = merge({}, payload, {
      isLastTestSuccessfull,
      testSessions
    });

    patchState({
      selectedVariation
    });
  }

  @Action(VariationListLoadAction)
  async loadVariationList({ patchState }: StateContext<TestStateModel>, { payload }: VariationListLoadAction) {
    try {
      const rawVariationList = await this.testService.getVariationList(payload).toPromise();

      const variationList = rawVariationList.map(variation => {
        return merge({}, variation, {
          isLastTestSuccessfull: this.isSucessfull(variation.testSessions[0])
        });
      });

      patchState({
        selectedVariationList: variationList
      });
    } catch (error) {
      console.error(error);
    }
  }

  @Action(SelectTestSessionIdAction)
  async selectTestSessionIdAction(
    { patchState }: StateContext<TestStateModel>,
    { payload }: SelectTestSessionIdAction
  ) {
    patchState({
      selectedTestSessionId: payload
    });
  }

  @Action(SelectTestIdAction)
  async selectTestIdAction({ patchState, getState }: StateContext<TestStateModel>, { payload }: SelectTestIdAction) {
    patchState({
      selectedTestId: getState().selectedTestId === payload ? null : payload
    });
  }

  @Action(AcceptNewBaselineAction)
  async acceptNewBaseline(
    { patchState, getState, dispatch }: StateContext<TestStateModel>,
    { payload }: AcceptNewBaselineAction
  ) {
    const selectedVariation = cloneDeep(getState().selectedVariation);
    const testSession = selectedVariation.testSessions.find(tS => tS.id === getState().selectedTestSessionId);
    const testSessionState = testSession.state;
    testSession.state = TestSessionState.ACCEPTED;
    patchState({
      selectedVariation
    });

    try {
      const variation = await this.testService
        .acceptNewBaseline(payload.testSessionId, payload.variationId, payload.comment)
        .toPromise();

      patchState({
        selectedVariation: variation
      });

      return dispatch(new SetVariationAction(variation));
    } catch (error) {
      testSession.state = testSessionState;
      patchState({
        selectedVariation
      });
      console.error(error);
    }
  }

  @Action(DeclineTestSessionAction)
  declineTestSessionAction(
    { patchState, getState }: StateContext<TestStateModel>,
    { payload }: DeclineTestSessionAction
  ) {
    const selectedVariation = cloneDeep(getState().selectedVariation);
    const testSession = selectedVariation.testSessions.find(tS => tS.id === getState().selectedTestSessionId);
    const testSessionState = testSession.state;
    testSession.state = TestSessionState.DECLINED;

    patchState({
      selectedVariation
    });

    try {
      return this.testService.declineTestSession(payload.testSessionId, payload.comment);
    } catch (error) {
      testSession.state = testSessionState;
      patchState({
        selectedVariation
      });
      console.error(error);
    }
  }

  @Action(DeleteTestSessionAction)
  deleteTestSessionAction({  }: StateContext<TestStateModel>, { payload }: DeleteTestSessionAction) {
    return this.testService.declineTestSession(payload, null);
  }

  @Action(TestDeleteAction)
  deleteTestAction({ patchState, getState }: StateContext<TestStateModel>, { payload }: TestDeleteAction) {
    const list = getState().list;
    remove(list, payload);
    patchState({ list });

    return this.testService.deleteTest(payload);
  }

  @Action(DeleteVariationAction)
  deleteVariationAction({ patchState, getState }: StateContext<TestStateModel>, { payload }: DeleteVariationAction) {
    const selectedVariationList = cloneDeep(getState().selectedVariationList);
    remove(selectedVariationList, payload);
    patchState({ selectedVariationList });

    return this.testService.deleteVariation(payload);
  }

  ngxsOnInit({ dispatch }: StateContext<TestStateModel>) {
    dispatch(new TestSubscribeAction());
  }

  isSucessfull(testSession: TestSession): boolean {
    return (
      (testSession.imageKey !== null &&
        testSession.misMatchPercentage !== null &&
        testSession.misMatchPercentage <= testSession.misMatchTolerance) ||
      (testSession.misMatchPercentage === null && !!testSession.baselineRef)
    );
  }
}
