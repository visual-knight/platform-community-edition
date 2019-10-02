import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

export interface ILayoutConf {
  navigationPos?: string; // side, top
  sidebarStyle?: string; // full, compact, closed
  dir?: string; // ltr, rtl
  layoutInTransition?: boolean;
  isMobile?: boolean;
  useBreadcrumb?: boolean;
  breadcrumb?: string; // simple, title
  topbarFixed?: boolean;
}
interface ILayoutChangeOptions {
  duration?: number;
  transitionClass?: boolean;
}
interface IAdjustScreenOptions {
  browserEvent?: any;
  route?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  public layoutConf: ILayoutConf;
  layoutConfSubject = new BehaviorSubject<ILayoutConf>(this.layoutConf);
  layoutConf$ = this.layoutConfSubject.asObservable();
  public isMobile: boolean;
  public currentRoute: string;
  public fullWidthRoutes = ['shop'];

  constructor(private router: Router) {
    this.setAppLayout();
  }

  setAppLayout() {
    this.layoutConf = {
      navigationPos: 'top',
      sidebarStyle: 'closed',
      dir: 'ltr',
      useBreadcrumb: true,
      topbarFixed: false,
      breadcrumb: 'title'
    };
  }

  publishLayoutChange(lc: ILayoutConf, opt: ILayoutChangeOptions = {}) {
    const duration = opt.duration || 250;
    if (!opt.transitionClass) {
      this.layoutConf = Object.assign(this.layoutConf, lc);
      return this.layoutConfSubject.next(this.layoutConf);
    }

    this.layoutConf = Object.assign(this.layoutConf, lc, {
      layoutInTransition: true
    });
    this.layoutConfSubject.next(this.layoutConf);

    setTimeout(() => {
      this.layoutConf = Object.assign(this.layoutConf, {
        layoutInTransition: false
      });
      this.layoutConfSubject.next(this.layoutConf);
    }, duration);
  }

  adjustLayout(options: IAdjustScreenOptions = {}) {
    let sidebarStyle: string;
    this.isMobile = this.isSm();
    this.currentRoute = options.route || this.currentRoute;
    sidebarStyle = this.isMobile ? 'closed' : 'full';

    if (this.currentRoute) {
      this.fullWidthRoutes.forEach(route => {
        if (this.currentRoute.indexOf(route) !== -1) {
          sidebarStyle = 'closed';
        }
      });
    }

    this.publishLayoutChange({
      isMobile: this.isMobile,
      sidebarStyle: sidebarStyle
    });
  }
  isSm() {
    return window.matchMedia(`(max-width: 959px)`).matches;
  }
}
