import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'visual-knight-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.scss']
})
export class AddProjectModalComponent {
  constructor(public dialogRef: MatDialogRef<AddProjectModalComponent>) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.dialogRef.close(form.value);
    }
  }

  onAbortCreateNewProject(): void {
    this.dialogRef.close();
  }
}
