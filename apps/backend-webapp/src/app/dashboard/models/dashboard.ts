import { Field, ObjectType } from 'type-graphql';
import { TestStatistic } from './teststatistic';
import { ApiStatistics } from './api-statistics';
import { ProjectSuccess } from './project-success';
import { RecentTest } from './recent-test';

@ObjectType()
export class Dashboard {
  @Field(type => ApiStatistics, { nullable: true })
  api?: ApiStatistics;

  @Field(type => [ProjectSuccess], { nullable: true })
  projectsSuccess?: ProjectSuccess;

  @Field(type => [RecentTest], { nullable: true })
  recentTests?: RecentTest;

  @Field(type => TestStatistic)
  testStatistics: TestStatistic;
}
