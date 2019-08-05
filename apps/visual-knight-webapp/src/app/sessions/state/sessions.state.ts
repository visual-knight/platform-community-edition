import { NgxsOnInit, State, Action, StateContext } from '@ngxs/store';
import { SessionsStateModel } from './sessions.state.model';
import { SessionsSignUpAction } from './sessions.actions';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Login } from '../../auth/state/auth.actions';

@State<SessionsStateModel>({
  name: 'sessions',
  defaults: {
    authError: null
  }
})
export class SessionsState implements NgxsOnInit {
  constructor(private authService: AuthService, private router: Router) {}

  @Action(SessionsSignUpAction)
  async signup({ patchState, dispatch }: StateContext<SessionsStateModel>, { payload }: SessionsSignUpAction) {
    try {
      await this.authService.signUp(payload.email, payload.password).toPromise();
      return dispatch(new Login({ email: payload.email, password: payload.password }));
    } catch (error) {
      patchState({
        authError: error
      });
    }
  }

  ngxsOnInit() {}
}
