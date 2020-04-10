import { resolve } from 'path';

export const environment = {
  production: false,

  // auth environments
  refreshTokenLife: '1d',
  accessTokenLife: 3600,
  refreshTokenSecret: process.env.VK_APP_SECRET,
  accessTokenSecret: process.env.VK_APP_SECRET,

  // bcrypto
  saltRounds: 10,

  // graphql
  schemaPath: process.env.VK_GRAPHQL_SCHEMA_PATH,

  // database uri
  db: process.env.VK_DATABASE,

  // email
  email: {
    user: process.env.VK_EMAIL_USER,
    password: process.env.VK_EMAIL_PW,
    smtp: process.env.VK_EMAIL_SMTP_PROVIDER,

    registrationExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h valid
    forgotPasswordExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h valid
    invitationExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 72, // 72h valid

    templateDirectory: resolve(__dirname, '../../..', 'apps/server/src/app/email/templates')
  },

  appDomain: process.env.VK_APP_DOMAIN,
  appBodyParserJsonLimit: process.env.VK_BODY_PARSER_JSON_LIMIT,

  diffOptions: {
    threshold: 0.01,
    includeAA: true
  }
};
