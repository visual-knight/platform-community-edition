import { Directive, Host, Self, Optional, OnDestroy, OnInit } from '@angular/core';
import { MediaChange, ObservableMedia } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { MatSidenav } from '@angular/material';

@Directive({
  selector: '[EgretSideNavToggle]'
})
export class EgretSideNavToggleDirective implements OnInit, OnDestroy {
  isMobile;
  screenSizeWatcher: Subscription;
  constructor(
    private media: ObservableMedia,
    @Host()
    @Self()
    @Optional()
    public sideNav: MatSidenav
  ) {}

  ngOnInit() {
    this.initSideNav();
  }

  ngOnDestroy() {
    if (this.screenSizeWatcher) {
      this.screenSizeWatcher.unsubscribe();
    }
  }

  updateSidenav() {
    setTimeout(() => {
      this.sideNav.opened = !this.isMobile;
      this.sideNav.mode = this.isMobile ? 'over' : 'side';
    });
  }
  initSideNav() {
    this.isMobile = this.media.isActive('xs') || this.media.isActive('sm');
    this.updateSidenav();
    this.screenSizeWatcher = this.media.subscribe((change: MediaChange) => {
      this.isMobile = change.mqAlias === 'xs' || change.mqAlias === 'sm';
      this.updateSidenav();
    });
  }
}
