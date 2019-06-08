import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class TestStatistic {
  @Field(type => Int) countFailedVariations: number;
  @Field(type => Int) countVariations: number;
  @Field(type => Int) countWaitingForReview: number;
}
