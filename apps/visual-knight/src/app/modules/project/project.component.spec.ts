import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule
} from '@angular/material';
import { ClipboardModule } from 'ngx-clipboard';
import { ApolloTestingModule } from 'apollo-angular/testing';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectComponent],
      imports: [
        RouterTestingModule,
        MatCardModule,
        MatToolbarModule,
        MatIconModule,
        ClipboardModule,
        MatDialogModule,
        MatSnackBarModule,
        ApolloTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
