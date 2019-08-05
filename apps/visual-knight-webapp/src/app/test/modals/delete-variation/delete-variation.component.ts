import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'vk-delete-variation',
  templateUrl: './delete-variation.component.html',
  styleUrls: ['./delete-variation.component.scss']
})
export class DeleteVariationComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteVariationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
