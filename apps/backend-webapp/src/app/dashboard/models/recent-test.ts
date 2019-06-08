import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class RecentTest {
  @Field(type => ID) id: string;
  @Field() name: string;
  @Field(type => Boolean) success: boolean;
  // @Field(type => DateTime) lastUpdate: Date;
}
