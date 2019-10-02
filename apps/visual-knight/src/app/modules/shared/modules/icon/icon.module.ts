import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserIconComponent } from './browser-icon/browser-icon.component';
import { OsIconComponent } from './os-icon/os-icon.component';
import { MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, MatTooltipModule],
  declarations: [BrowserIconComponent, OsIconComponent],
  exports: [BrowserIconComponent, OsIconComponent]
})
export class IconModule {}
