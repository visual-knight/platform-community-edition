import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './models/dashboard';

@Resolver(of => Dashboard)
export class DashboardResolver {
  constructor(private dashboardService: DashboardService) {}

  @Query(returns => Dashboard, { nullable: true })
  @UseGuards(GqlAuthGuard)
  dashboard(@CurrentUser() user) {
    return this.dashboardService.getDashboardData(user);
  }
}
