import { Plan } from './plan.model';

export interface Product {
  id: string;
  maxComparisons: number;
  maxProjects: number;
  maxUsers: number;
  plans: Plan[];
  nickname: string;
}
