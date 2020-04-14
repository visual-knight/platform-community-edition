import { Field, ObjectType, Int } from 'type-graphql';

@ObjectType()
export class IgnoreAreaType {
  @Field(type => Int)
  x: number;

  @Field(type => Int)
  y: number;

  @Field(type => Int)
  width: number;

  @Field(type => Int)
  height: number;
}
