import { Field, ObjectType, ID } from 'type-graphql';
import { VariationType } from '../../variation/models/variation';
import { ProjectType } from '../../project/models/project';

@ObjectType()
export class TestType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  project: ProjectType;

  @Field(type => [VariationType])
  variations: VariationType[];
}
