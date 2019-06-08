import { IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class BankAccountInput {
  @Field() id: string;
  @Field() object: string;
  @Field() account_holder_name: string;
  @Field() account_holder_type: string;
  @Field() bank_name: string;
  @Field() country: string;
  @Field() currency: string;
  @Field() fingerprint: string;
  @Field() last4: string;
  @Field() routing_number: string;
  @Field({ nullable: true }) @IsOptional() status: string;
}
