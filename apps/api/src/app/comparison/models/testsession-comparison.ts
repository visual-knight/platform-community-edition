import { Field, ObjectType } from 'type-graphql';
import { TestSessionType } from '../../testsession/models/testsession';

@ObjectType()
export class TestSessionComparison extends TestSessionType {
  @Field()
  link: String;
}
