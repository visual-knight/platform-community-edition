import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Address {
  @Field()
  company: string;

  @Field()
  address: string;

  @Field()
  zipcode: string;

  @Field()
  city: string;

  @Field()
  state: string;

  @Field()
  country: string;

  @Field({ nullable: true })
  vat?: string;
}
