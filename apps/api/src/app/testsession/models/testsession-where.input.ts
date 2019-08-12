import { InputType, Field, ID, Float } from 'type-graphql';
import { TestSessionState } from '@generated/photonjs';

@InputType()
export class TestSessionDataArgs {
  @Field(type => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  diffImageKey?: string;

  @Field({ nullable: true })
  imageKey?: string;

  @Field(type => Float, { nullable: true })
  misMatchPercentage?: number;

  @Field(type => Float)
  misMatchTolerance: number;

  @Field(type => Boolean, { nullable: true })
  isSameDimensions?: boolean;

  @Field(type => String)
  state: TestSessionState;

  @Field({ nullable: true })
  stateComment?: string;

  @Field(type => Boolean)
  autoBaseline: boolean;
}
