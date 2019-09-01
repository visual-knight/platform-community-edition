import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'visual-knight-delete-variation',
  templateUrl: './delete-variation.component.html',
  styleUrls: ['./delete-variation.component.scss']
})
export class DeleteVariationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteVariationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
