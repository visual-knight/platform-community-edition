import { Field, InputType, Int } from 'type-graphql';

@InputType()
export class IgnoreAreaDataArgs {
  @Field(type => Int)
  x: number;

  @Field(type => Int)
  y: number;

  @Field(type => Int)
  width: number;

  @Field(type => Int)
  height: number;
}
