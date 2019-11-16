export const environment = {
  production: true,
  stage: 'production',

  // auth environments
  refreshTokenLife: 3600 * 24,
  accessTokenLife: 3600,
  refreshTokenSecret: process.env.VK_APP_SECRET,
  accessTokenSecret: process.env.VK_APP_SECRET,

  // bcrypto
  saltRounds: 10,

  // graphql
  schemaPath: '/tmp/schema.graphql',

  // email
  email: {
    user: 'noreply@visual-knight.io',
    password: process.env.EMAIL_PW,
    smtp: 'smtp.1und1.de',

    registrationExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h valid
    forgotPasswordExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h valid
    invitationExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 72 // 72h valid
  },

  appDomain: process.env.APP_DOMAIN,

  diffOptions: {
    threshold: 0.01,
    includeAA: true
  }
};
