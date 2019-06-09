import { State, StateContext, Action, Selector, NgxsOnInit } from '@ngxs/store';
import { AppStateModel } from './app.state.model';

@State<AppStateModel>({
  name: 'app',
  defaults: {
    userNavigation: []
  }
})
export class AppState implements NgxsOnInit {
  constructor() {}

  @Selector()
  static userNavigation(state: AppStateModel) {
    return state.userNavigation;
  }

  ngxsOnInit({ patchState }: StateContext<AppStateModel>) {
    // init default user navigation
    patchState({
      userNavigation: this.getDefaultUserNavigation()
    });
  }

  private getDefaultUserNavigation() {
    return [
      {
        name: 'DASHBOARD',
        type: 'link',
        tooltip: 'Dashboard',
        icon: 'dashboard',
        state: 'dashboard'
        // badges: [{ color: 'accent', value: '100+' }]
      },
      {
        name: 'PROJECTS',
        type: 'link',
        tooltip: 'Project',
        icon: 'inbox',
        state: 'project'
      },
      {
        name: 'TESTS',
        type: 'link',
        tooltip: 'Tests',
        icon: 'chat',
        state: 'test'
      },
      {
        name: 'DOCUMENTATION',
        type: 'ext_link',
        tooltip: 'Documentation',
        icon: 'book',
        state: 'https://doc.visual-knight.io'
      }
    ];
  }
}
