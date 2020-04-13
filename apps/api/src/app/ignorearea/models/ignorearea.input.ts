import { Field, InputType, Float } from 'type-graphql';

@InputType()
export class IgnoreAreaDataArgs {
  @Field(type => Float)
  x: number;

  @Field(type => Float)
  y: number;

  @Field(type => Float)
  width: number;

  @Field(type => Float)
  height: number;
}
