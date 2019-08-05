import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatSidenavModule,
  MatListModule,
  MatTooltipModule,
  MatOptionModule,
  MatSelectModule,
  MatMenuModule,
  MatSnackBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatRadioModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatDialogModule
} from '@angular/material';

// ONLY REQUIRED FOR **TOP** NAVIGATION LAYOUT
import { HeaderComponent } from '../header-top/header-top.component';
import { SidebarTopComponent } from './components/sidebar-top/sidebar-top.component';

// ALL TIME REQUIRED


// DIRECTIVES
import { FontSizeDirective } from './directives/font-size.directive';
import { ScrollToDirective } from './directives/scroll-to.directive';
import { AppDropdownDirective } from './directives/dropdown.directive';
import { DropdownAnchorDirective } from './directives/dropdown-anchor.directive';
import { DropdownLinkDirective } from './directives/dropdown-link.directive';
import { EgretSideNavToggleDirective } from './directives/egret-side-nav-toggle.directive';

// PIPES
import { RelativeTimePipe } from './pipes/relative-time.pipe';
import { ExcerptPipe } from './pipes/excerpt.pipe';

// SERVICES
import { WINDOW_PROVIDERS } from './helpers/window.helper';
import { PublicLayoutComponent } from './components/layouts/public-layout/public-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { PricingModule } from './modules/pricing/pricing.module';

// cookie disclaimer
import { NgcCookieConsentModule } from 'ngx-cookieconsent';
import { cookieConfig } from './cookies.config';
import { RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaModule, RecaptchaComponent } from 'ng-recaptcha';
import { environment } from '../../environments/environment.test';
import { RecaptchaFormsModule, RecaptchaValueAccessorDirective } from 'ng-recaptcha/forms';
import { FiltersModule } from './modules/filters/filters.module';
import { AuthLayoutComponent } from '../layout/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from '../layout/admin-layout/admin-layout.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    MatOptionModule,
    MatSelectModule,
    MatMenuModule,
    MatSnackBarModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatDialogModule,
    PricingModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    FiltersModule
  ],
  entryComponents: [AppComfirmComponent, AppLoaderComponent],
  providers: [
    WINDOW_PROVIDERS,
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: { siteKey: environment.recaptchaKey } as RecaptchaSettings
    }
  ],
  declarations: [
    HeaderComponent,
    SidebarTopComponent,
    SidenavComponent,
    NotificationsComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PublicLayoutComponent,
    BreadcrumbComponent,
    AppComfirmComponent,
    AppLoaderComponent,
    FontSizeDirective,
    ScrollToDirective,
    AppDropdownDirective,
    DropdownAnchorDirective,
    DropdownLinkDirective,
    EgretSideNavToggleDirective,
    RelativeTimePipe,
    ExcerptPipe,
    FooterComponent
  ],
  exports: [
    HeaderComponent,
    SidebarTopComponent,
    SidenavComponent,
    NotificationsComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    PublicLayoutComponent,
    BreadcrumbComponent,
    AppComfirmComponent,
    AppLoaderComponent,
    FontSizeDirective,
    ScrollToDirective,
    AppDropdownDirective,
    DropdownAnchorDirective,
    DropdownLinkDirective,
    EgretSideNavToggleDirective,
    RelativeTimePipe,
    ExcerptPipe,
    FooterComponent,
    RecaptchaComponent,
    RecaptchaValueAccessorDirective
  ]
})
export class SharedModule {}
