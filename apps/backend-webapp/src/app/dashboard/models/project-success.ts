import { Field, ObjectType, Int, ID } from 'type-graphql';

@ObjectType()
export class ProjectSuccess {
  @Field(type => ID) id: string;
  @Field() name: string;
  @Field(type => Int) totalTests: number;
  @Field(type => Int) failedTests: number;
}
