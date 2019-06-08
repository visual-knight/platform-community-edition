import { Injectable } from '@nestjs/common';
import { Plan } from '../../../generated/graphql.schema';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class ProductService {
  constructor(private stripe: StripeService) {
    // this.updateUsagePlans();
  }

  private productsCache: { [key: string]: Product } = {};

  async updateUsagePlans() {
    this.productsCache = {};
    const products = (await this.stripe.products.list()).data;
    products.forEach(p => {
      const product: Product = {
        id: p.id,
        plans: [],
        maxComparisons: parseInt(p.metadata.maxComparisons, 10),
        maxProjects: parseInt(p.metadata.maxProjects, 10),
        maxUsers: parseInt(p.metadata.maxUsers, 10)
      };
      this.productsCache[product.id] = product;
    });
    const plans = (await this.stripe.plans.list()).data;
    plans.forEach(p => {
      this.productsCache[p.product.toString()].plans.push({
        id: p.id,
        price: p.amount / 100,
        interval: p.interval
      });
      this.productsCache[p.product.toString()].nickname = p.nickname;
    });
  }

  getProducts() {
    return Object.values(this.productsCache);
  }

  findProductByPlanId(stripePlanId: string): Product {
    return Object.values(this.productsCache).find(
      product => !!product.plans.find(plan => plan.id === stripePlanId)
    );
  }

  getPlanById(id: string): Plan {
    return Object.values(this.productsCache)
      .find(product => !!product.plans.find(plan => plan.id === id))
      .plans.find(plan => plan.id === id);
  }

  getFreePlan() {
    const freePlan = Object.values(this.productsCache).find(
      product => product.nickname === 'Free'
    );
    if (!freePlan) {
      throw new Error(`Can't find free plan!!!`);
    }
    return freePlan;
  }
}

export interface Product {
  id: string;
  maxComparisons: number;
  maxProjects: number;
  maxUsers: number;
  plans: Plan[];
  nickname?: string;
}
