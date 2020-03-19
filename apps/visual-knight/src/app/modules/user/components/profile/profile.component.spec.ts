import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatFormFieldModule,
  MatCardModule,
  MatSnackBarModule,
  MatInputModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatIconModule,
  MatMenuModule,
  MatBadgeModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ApolloTestingModule } from 'apollo-angular/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfileComponent } from './profile.component';
import { AccountManagementComponent } from '../account-management/account-management.component';
import { UserManagementComponent } from '../user-management/user-management.component';
import { VerificationBoxComponent } from '../verification-box/verification-box.component';
import { ClipboardModule } from 'ngx-clipboard';
import { of } from 'rxjs';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ProfileComponent,
        AccountManagementComponent,
        UserManagementComponent,
        VerificationBoxComponent
      ],
      imports: [
        MatCardModule,
        MatTabsModule,
        MatTabsModule,
        MatTooltipModule,
        ClipboardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatTableModule,
        MatIconModule,
        MatMenuModule,
        RouterTestingModule,
        ApolloTestingModule,
        MatBadgeModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatInputModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.userList$ = of([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
