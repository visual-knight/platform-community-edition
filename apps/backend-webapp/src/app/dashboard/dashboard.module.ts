import { Module } from '@nestjs/common';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardService } from './dashboard.service';

@Module({
  providers: [DashboardResolver, DashboardService]
})
export class DashboardModule {}
