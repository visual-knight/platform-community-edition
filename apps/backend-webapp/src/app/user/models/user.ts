import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field(type => ID)
  id: number;

  @Field()
  email: string;

  @Field({ nullable: true })
  forename?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  phoneNumber?: string;

  @Field()
  active: boolean;
}

//   # contractUserOwner: ContractUser
//   # contractUser: ContractUser
//   # projects: [Project!]!
//   # role: Role!
//   # address: Address
