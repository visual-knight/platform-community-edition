import { Field, ObjectType, ID } from 'type-graphql';
import { TestSessionType } from '../../testsession/models/testsession';
import { JSONResolver, DateTimeResolver } from 'graphql-scalars';

@ObjectType()
export class VariationType {
  @Field(type => ID)
  id: string;

  @Field()
  browserName: string;

  @Field()
  deviceName: string;

  @Field(type => DateTimeResolver)
  createdAt: String;

  @Field(type => JSONResolver, { nullable: true })
  additionalData?: any;

  @Field({ nullable: true })
  baseline?: TestSessionType;

  @Field(type => [TestSessionType])
  testSessions: TestSessionType[];

  // @Field()
  // test: TestType;
}
