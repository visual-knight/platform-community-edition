import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from './auth-service.service';
import { TestHelperService } from './services/test-helper.service';

@NgModule({
  declarations: [],
  providers: [AuthServiceService, TestHelperService],
  imports: [CommonModule]
})
export class CoreModule {}
