import { Component, OnInit, Input } from '@angular/core';
import { IMenuItem, IChildItem } from './user-navigation.model';
import { AuthService } from '../../core/auth-service.service';
import { ILayoutConf, LayoutService } from '../layout.service';

@Component({
  selector: 'visual-knight-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  layoutConf: ILayoutConf;
  menuItems: IMenuItem[];

  // @Select(AuthState.profilePicture) profilePicture$: string;
  // @Select(AppState.userNavigation) userNavigation$: Observable<IMenuItem[]>;

  @Input() notificPanel;
  constructor(
    private authService: AuthService,
    private layout: LayoutService
  ) {}

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    const userNavigationMenuItems = this.getDefaultUserNavigation().filter(
      item => item.type !== 'icon' && item.type !== 'separator'
    );
    const limit = 4;
    const mainItems = userNavigationMenuItems.slice(0, limit);
    if (userNavigationMenuItems.length <= limit) {
      return (this.menuItems = mainItems);
    }
    const subItems = userNavigationMenuItems.slice(
      limit,
      userNavigationMenuItems.length - 1
    ) as IChildItem[];
    mainItems.push({
      name: 'More',
      type: 'dropDown',
      tooltip: 'More',
      icon: 'more_horiz',
      sub: subItems
    });
    this.menuItems = mainItems;
  }

  toggleNotific() {
    this.notificPanel.toggle();
  }

  toggleSidenav() {
    if (this.layoutConf.sidebarStyle === 'closed') {
      return this.layout.publishLayoutChange({
        sidebarStyle: 'full'
      });
    }
    this.layout.publishLayoutChange({
      sidebarStyle: 'closed'
    });
  }

  logout() {
    this.authService.logout();
  }

  private getDefaultUserNavigation(): IMenuItem[] {
    return [
      // {
      //   name: 'DASHBOARD',
      //   type: 'link',
      //   tooltip: 'Dashboard',
      //   icon: 'dashboard',
      //   state: 'dashboard'
      //   // badges: [{ color: 'accent', value: '100+' }]
      // },
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
