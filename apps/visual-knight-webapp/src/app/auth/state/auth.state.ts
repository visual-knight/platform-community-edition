import { State, Selector, Action, StateContext, NgxsOnInit } from '@ngxs/store';
import { AuthStateModel } from './auth.state.model';
import {
  Login,
  Logout,
  LoadUserInfo,
  UserCompleteInvitationAction,
  UpdateUserPlanIdAction,
  LogoutExpired,
  UpdateAccessTokenAction,
  SubscribeVerificationAction
} from './auth.actions';
import { AuthService } from '../auth.service';
import { tap, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { UserRole } from '../../models/user.model';
import { cloneDeep, merge } from 'lodash-es';
import { getGravatarImageHash } from '../../helpers/utils';
import { Apollo } from 'apollo-angular';
import { Subscription } from 'rxjs';

const defaults: Function = function(): AuthStateModel {
  return {
    isAuthenticated: null,
    userPictures: {
      profilePicture: undefined,
      profilePictureBig: undefined
    },
    user: undefined,
    invitationState: null
  };
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: defaults()
})
export class AuthState implements NgxsOnInit {
  @Selector()
  static isAuthenticated(state: AuthStateModel) {
    return state.isAuthenticated;
  }

  @Selector()
  static invitationState(state: AuthStateModel) {
    return state.invitationState;
  }

  @Selector()
  static contractId(state: AuthStateModel) {
    return state.user.contractUser.id;
  }

  @Selector()
  static isVerified(state: AuthStateModel) {
    return state.user.active;
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static isOwner(state: AuthStateModel) {
    return state.user && state.user.role === UserRole.OWNER;
  }

  @Selector()
  static subscriptionPlanId(state: AuthStateModel) {
    return state.user.contractUser.planStripeId;
  }

  @Selector()
  static profilePicture(state: AuthStateModel) {
    return state.userPictures.profilePicture;
  }

  @Selector()
  static profilePictureBig(state: AuthStateModel) {
    return state.userPictures.profilePictureBig;
  }


  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private apollo: Apollo
  ) {}

  @Action(Login)
  login({ dispatch }: StateContext<AuthStateModel>, { payload: { email, password } }: Login) {
    return this.authService.login(email, password).pipe(
      map(({ token, refreshToken }) => {
        if (token && refreshToken) {
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          dispatch(new LoadUserInfo());

          const referUrl = this.route.snapshot.queryParams['referUrl'] || '/dashboard';
          this.router.navigateByUrl(referUrl);
        }
      })
    );
  }
  @Action(Logout)
  logout({ patchState, setState }: StateContext<AuthStateModel>) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setState(defaults());
    patchState({ isAuthenticated: false });
    this.apollo.getClient().resetStore();
    return this.router.navigateByUrl('/sessions/signin');
  }
  @Action(LogoutExpired)
  logoutExpired({ patchState, setState }: StateContext<AuthStateModel>) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setState(defaults());
    patchState({ isAuthenticated: false });
    this.apollo.getClient().resetStore();
    return this.router.navigate(['/sessions', 'signin'], { queryParams: { expiredToken: 1 } });
  }

  @Action(UpdateUserPlanIdAction)
  updatePlanId({ patchState, getState }: StateContext<AuthStateModel>, { payload }: UpdateUserPlanIdAction) {
    const user = merge({}, cloneDeep(getState().user), { contractData: { planStripeId: payload } });
    patchState({
      user
    });
  }

  @Action(UpdateAccessTokenAction)
  refreshAccessToken({ patchState }: StateContext<AuthStateModel>, { payload }: UpdateAccessTokenAction) {
    console.log('AccessToken refreshed');
    localStorage.setItem('token', payload);
  }

  @Action(SubscribeVerificationAction)
  subscribeVerification({ patchState, getState }: StateContext<AuthStateModel>) {
    let subscribtion: Subscription;
    subscribtion = this.authService.subscribeUserVerification().subscribe(active => {
      patchState({
        user: {
          ...getState().user,
          active
        }
      });
      if (active) {
        subscribtion.unsubscribe();
      }
    });
  }

  @Action(UserCompleteInvitationAction)
  async userCompleteInvitationAction(
    { patchState, getState }: StateContext<AuthStateModel>,
    { payload }: UserCompleteInvitationAction
  ) {
    try {
      const { user, token, refreshToken } = await this.authService
        .completeInvitation(payload.token, payload.password)
        .toPromise();

      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);

      patchState({
        isAuthenticated: true,
        user,
        // TODO: not sure if this was correctly ported
        userPictures: {
          ...getState().userPictures,
          profilePicture: getGravatarImageHash(user.email, 40),
          profilePictureBig: getGravatarImageHash(user.email, 200)
        }
      });
    } catch (error) {
      patchState({
        invitationState: error
      });
    }
  }

  @Action(LoadUserInfo)
  loadUserInfo({ patchState, getState, dispatch }: StateContext<AuthStateModel>) {
    return this.authService.loadUserInfo().pipe(
      map(userInfo => {
        if (!userInfo) {
          patchState({ isAuthenticated: false });
          return dispatch(new Logout());
        }
        const state = getState();
        patchState({
          isAuthenticated: true,
          user: userInfo,
          userPictures: {
            ...state.userPictures,
            profilePicture: getGravatarImageHash(userInfo.email, 40),
            profilePictureBig: getGravatarImageHash(userInfo.email, 200)
          }
        });
        if (!userInfo.active) {
          dispatch(new SubscribeVerificationAction());
        }
      })
    );
  }

  ngxsOnInit({ dispatch, patchState }: StateContext<AuthStateModel>) {
    if (localStorage.getItem('token')) {
      dispatch(new LoadUserInfo());
    } else {
      patchState({ isAuthenticated: false });
    }
  }
}
