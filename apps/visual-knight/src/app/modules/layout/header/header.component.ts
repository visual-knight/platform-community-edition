import { Component, OnInit, Input } from '@angular/core';
import { IMenuItem, IChildItem } from './user-navigation.model';
import { AuthService } from '../../core/auth-service.service';
import { ILayoutConf, LayoutService } from '../layout.service';
import { map, startWith, tap } from 'rxjs/operators';
import { getGravatarImageHash } from '../../shared/utils/gravatar';
import { Observable } from 'rxjs';

@Component({
  selector: 'visual-knight-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  layoutConf: ILayoutConf;
  menuItems: IMenuItem[];

  profilePicture$ = this.authService.user$.pipe(
    startWith({
      email: 'assets/images/avatars/noavatar.png'
    }),
    map(user => getGravatarImageHash(user.email, 40))
  );

  isAuthenticated$: Observable<boolean> = this.authService.isAuthenticated$;

  constructor(private authService: AuthService, private layout: LayoutService) {}

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
    const subItems = userNavigationMenuItems.slice(limit, userNavigationMenuItems.length - 1) as IChildItem[];
    mainItems.push({
      name: 'More',
      type: 'dropDown',
      tooltip: 'More',
      icon: 'more_horiz',
      sub: subItems
    });
    this.menuItems = mainItems;
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
      // TODO: change documentation based on the new v2
      // {
      //   name: 'DOCUMENTATION',
      //   type: 'ext_link',
      //   tooltip: 'Documentation',
      //   icon: 'book',
      //   state: 'https://doc.visual-knight.io'
      // }
    ];
  }
}
