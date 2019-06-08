'use strict';

const stripe = jest.genMockFromModule('stripe');

stripe.products = {
  list: () =>
    jest.fn().mockResolvedValue([
      {
        id: 'free_id',
        metadata: {
          maxComparisons: 1000,
          maxProjects: 1,
          maxUsers: 1
        }
      },
      {
        id: 'basic_id',
        metadata: {
          maxComparisons: 10000,
          maxProjects: 2,
          maxUsers: 2
        }
      }
    ])
};

stripe.plans = {
  list: () =>
    jest.fn().mockResolvedValue([
      {
        id: 'free_plan_month_id',
        amount: 0,
        interval: 'month',
        nickname: 'FREE'
      },
      {
        id: 'free_plan_year_id',
        amount: 0,
        interval: 'year',
        nickname: 'FREE'
      }
    ])
};

stripe.LALALA = 'test'

module.exports = stripe;
