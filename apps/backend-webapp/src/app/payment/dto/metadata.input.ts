import { Field, InputType } from 'type-graphql';

@InputType()
export class MetadataInput {
  @Field()
  email: string;
}
