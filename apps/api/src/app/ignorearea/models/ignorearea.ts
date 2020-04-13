import { Field, ObjectType, ID, Float } from 'type-graphql';

@ObjectType()
export class IgnoreAreaType {
  @Field(type => ID)
  id: string;

  @Field(type => Float)
  x: number;

  @Field(type => Float)
  y: number;

  @Field(type => Float)
  width: number;

  @Field(type => Float)
  height: number;
}
