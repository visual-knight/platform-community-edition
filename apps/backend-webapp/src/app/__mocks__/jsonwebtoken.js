'use strict';

const jsonwebtoken = jest.genMockFromModule('jsonwebtoken');

jsonwebtoken.sign = user => `accessTokenFor_${user.email}`;
jsonwebtoken.verify = token => {
  if (token === 'expired') {
    return {
      email: 'expired_token@visual-knight.io',
      exp: Math.floor(Date.now() / 1000) - 3600
    };
  }
  if (token === 'invalid') {
    throw new Error('invalid');
  }
  return {
    email: 'verified_token@visual-knight.io',
    exp: Math.floor(Date.now() / 1000) + 3600
  };
};

module.exports = jsonwebtoken;
