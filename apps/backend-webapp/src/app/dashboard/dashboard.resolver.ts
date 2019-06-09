import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/auth.guard';
import { CurrentUser } from '../shared/decorators/current-user.decorator';
import { DashboardService } from './dashboard.service';
import { Dashboard } from './models/dashboard';
import { User } from '@platform-community-edition/prisma';

@Resolver(of => Dashboard)
export class DashboardResolver {
  constructor(private dashboardService: DashboardService) {}

  @Query(returns => Dashboard, { nullable: true })
  @UseGuards(GqlAuthGuard)
  dashboard(@CurrentUser() user: User) {
    return this.dashboardService.getDashboardData(user);
  }
}
