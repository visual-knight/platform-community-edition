import { InputType, Field, ID } from 'type-graphql';
import { TestSessionWhereInput } from '@platform-community-edition/prisma';

@InputType()
export class TestSessionWhereArgs implements TestSessionWhereInput {
  @Field(type => ID, { nullable: true })
  id?: string;
}
