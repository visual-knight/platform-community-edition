import { Component } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngxs/store';
import { ProjectAddAction } from '../../state/project.actions';
import {Project} from '../../../shared/models/project.model'

@Component({
  selector: 'vk-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class AddProjectComponent {
  constructor(private store: Store, public dialogRef: MatDialogRef<AddProjectComponent>) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const newProject = new Project(form.value.name, form.value.description);
      this.store.dispatch(new ProjectAddAction(newProject));
      this.dialogRef.close();
    }
  }

  onAbortCreateNewProject(): void {
    this.dialogRef.close();
  }
}
