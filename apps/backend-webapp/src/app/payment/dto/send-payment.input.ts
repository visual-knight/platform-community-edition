import { IsOptional, IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { TokenInput } from './token.input';

@InputType()
export class SendPaymentInput {
  @Field()
  token: TokenInput;

  @Field()
  @IsNotEmpty()
  planId: string;

  @Field({ nullable: true })
  @IsOptional()
  business_vat_id?: string;

  @Field({ nullable: true })
  @IsOptional()
  company?: string;
}
