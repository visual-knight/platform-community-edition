import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'vk-screenshot-view',
  templateUrl: './screenshot-view.component.html',
  styleUrls: ['./screenshot-view.component.scss']
})
export class ScreenshotViewComponent {
  constructor(
    public dialogRef: MatDialogRef<ScreenshotViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { image: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
