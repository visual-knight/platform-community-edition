import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class InvokeTestsession {
  @Field()
  url: String;

  @Field()
  testSessionId: String;
}
