import { getGreeting } from '../support/app.po';

describe('visual-knight', () => {
  beforeEach(() => cy.visit('/'));

  it('should display welcome message', () => {
    getGreeting().contains('Welcome to visual-knight!');
  });
});
