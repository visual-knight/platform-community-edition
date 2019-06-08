import { Field, ID, Float, ObjectType } from 'type-graphql';

@ObjectType()
export class Plan {
  @Field(type => ID)
  id: string;

  @Field(type => Float)
  price: number;

  @Field()
  interval: string;
}
