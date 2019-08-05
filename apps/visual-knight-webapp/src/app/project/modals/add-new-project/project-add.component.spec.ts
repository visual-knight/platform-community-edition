import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectComponent } from './project-add.component';

describe('AddComponent', () => {
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AddProjectComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
