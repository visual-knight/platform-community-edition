import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class SignedTestSessionUrls {
  @Field({ nullable: true })
  signedImageKey?: string;

  @Field({ nullable: true })
  signedDiffImageKey?: string;
}
