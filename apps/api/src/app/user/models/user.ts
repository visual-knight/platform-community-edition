import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  forename?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field()
  apiKey: string;

  @Field()
  active: boolean;

  // role?
}
