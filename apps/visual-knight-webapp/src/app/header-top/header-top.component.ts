import { Component, OnInit, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { IMenuItem } from '../models/user-navigation.model';
import { LayoutService } from '../layout.service';
import { AuthState } from '../auth/state/auth.state';
import { Observable } from 'rxjs';
import { Logout } from '../auth/state/auth.actions';
import { AppState } from '../state/app.state';

@Component({
  selector: 'vk-header-top',
  templateUrl: './header-top.component.html'
})
export class HeaderComponent implements OnInit {
  layoutConf: any;
  menuItems: any;

  @Select(AuthState.profilePicture) profilePicture$: string;
  @Select(AppState.userNavigation) userNavigation$: Observable<IMenuItem[]>;

  @Input() notificPanel;
  constructor(private layout: LayoutService, private store: Store) {}

  ngOnInit() {
    this.layoutConf = this.layout.layoutConf;
    this.userNavigation$.subscribe(res => {
      res = res.filter(item => item.type !== 'icon' && item.type !== 'separator');
      const limit = 4;
      const mainItems: any[] = res.slice(0, limit);
      if (res.length <= limit) {
        return (this.menuItems = mainItems);
      }
      const subItems: any[] = res.slice(limit, res.length - 1);
      mainItems.push({
        name: 'More',
        type: 'dropDown',
        tooltip: 'More',
        icon: 'more_horiz',
        sub: subItems
      });
      this.menuItems = mainItems;
    });
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
    this.store.dispatch(new Logout());
  }
}
