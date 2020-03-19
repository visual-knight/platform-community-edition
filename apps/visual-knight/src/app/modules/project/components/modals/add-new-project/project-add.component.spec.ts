import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectModalComponent } from './project-add.component';
import {
  MatInputModule,
  MatFormFieldModule,
  MatDialogRef
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddComponent', () => {
  let component: AddProjectModalComponent;
  let fixture: ComponentFixture<AddProjectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddProjectModalComponent],
      providers: [{ provide: MatDialogRef, useValue: {} }],
      imports: [
        MatInputModule,
        FormsModule,
        MatFormFieldModule,
        BrowserAnimationsModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
