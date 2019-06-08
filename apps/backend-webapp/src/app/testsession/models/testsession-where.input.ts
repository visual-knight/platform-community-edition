import { InputType, Field, ID } from 'type-graphql';
import { TestSessionWhereInput } from '../../../generated/prisma-client';

@InputType()
export class TestSessionWhereArgs implements TestSessionWhereInput {
  @Field(type => ID, { nullable: true })
  id?: string;
}
