import { Field, ID, Float, ObjectType } from 'type-graphql';
import { Plan } from './plan';

@ObjectType()
export class Product {
  @Field(type => ID)
  id: string;

  @Field(type => Float)
  maxComparisons: number;

  @Field(type => Float)
  maxProjects: number;

  @Field(type => Float)
  maxUsers: number;

  @Field(type => [Plan])
  plans: Plan[];

  @Field()
  nickname: string;
}
