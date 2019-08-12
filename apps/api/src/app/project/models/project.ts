import { Field, ObjectType, ID } from 'type-graphql';

@ObjectType()
export class ProjectType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  // @Field()
  // tests: TestType[];
}
