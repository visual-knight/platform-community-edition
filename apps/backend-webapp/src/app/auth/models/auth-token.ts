import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthToken {
  @Field(type => Int)
  expiresIn: number;

  @Field()
  accessToken: string;
}
