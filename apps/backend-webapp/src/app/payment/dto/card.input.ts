import { IsOptional } from 'class-validator';
import { Field, InputType, Int } from 'type-graphql';
import { MetadataInput } from './metadata.input';

@InputType()
export class CardInput {
  @Field() id: string;
  @Field() object: string;
  @Field({ nullable: true }) @IsOptional() address_city?: string;
  @Field({ nullable: true }) @IsOptional() address_country?: string;
  @Field({ nullable: true }) @IsOptional() address_line1?: string;
  @Field({ nullable: true }) @IsOptional() address_line1_check?: string;
  @Field({ nullable: true }) @IsOptional() address_line2?: string;
  @Field({ nullable: true }) @IsOptional() address_state?: string;
  @Field({ nullable: true }) @IsOptional() address_zip?: string;
  @Field({ nullable: true }) @IsOptional() address_zip_check?: string;
  @Field({ nullable: true }) @IsOptional() currency?: string;
  @Field({ nullable: true }) @IsOptional() cvc_check?: string;
  @Field({ nullable: true }) @IsOptional() dynamic_last4?: string;
  @Field({ nullable: true }) @IsOptional() fingerprint?: string;
  @Field({ nullable: true }) @IsOptional() name?: string;
  @Field({ nullable: true }) @IsOptional() tokenization_method?: string;
  @Field({ nullable: true }) @IsOptional() three_d_secure?: string;
  @Field(type => MetadataInput, { nullable: true })
  @IsOptional()
  metadata?: MetadataInput;

  @Field() brand: string;
  @Field() country: string;
  @Field(type => Int) exp_month: number;
  @Field(type => Int) exp_year: number;
  @Field(type => Int) funding: string;
  @Field(type => Int) last4: string;
}
