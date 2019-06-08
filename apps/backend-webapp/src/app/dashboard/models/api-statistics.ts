import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class ApiStatistics {
  @Field(type => Int) totalQuota: number;
  @Field(type => Int) remaining: number;
  @Field(type => Int) used: number;
}
