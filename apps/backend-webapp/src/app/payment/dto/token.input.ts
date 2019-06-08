import { IsOptional } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { BankAccountInput } from './bankaccount.input';
import { CardInput } from './card.input';

@InputType()
export class TokenInput {
  @Field()
  id: string;

  @Field()
  object: string;

  @Field(type => BankAccountInput, { nullable: true })
  @IsOptional()
  bank_account?: BankAccountInput;

  @Field(type => CardInput, { nullable: true })
  @IsOptional()
  card?: CardInput;

  @Field()
  client_ip: string;

  @Field(type => Int)
  created: number;
  @Field(type => Boolean)
  livemode: number;

  @Field()
  type: string;
  @Field(type => Boolean)
  used: number;
}
