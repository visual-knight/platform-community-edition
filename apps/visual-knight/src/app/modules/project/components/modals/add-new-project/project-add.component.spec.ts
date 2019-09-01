import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectModalComponent } from './project-add.component';

describe('AddComponent', () => {
  let component: AddProjectModalComponent;
  let fixture: ComponentFixture<AddProjectModalComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AddProjectModalComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
