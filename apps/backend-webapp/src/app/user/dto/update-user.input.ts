import { IsOptional, IsPhoneNumber } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class UpdateUserInput {
  @Field()
  email: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsPhoneNumber(null)
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  forename?: string;

  @Field({ nullable: true })
  @IsOptional()
  lastname?: string;
}
