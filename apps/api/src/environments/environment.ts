import { resolve } from 'path';

export const environment = {
  production: false,
  stage: 'development',

  // auth environments
  refreshTokenLife: '1d',
  accessTokenLife: 3600,
  refreshTokenSecret: process.env.VK_APP_SECRET,
  accessTokenSecret: process.env.VK_APP_SECRET,

  // bcrypto
  saltRounds: 10,

  // graphql
  schemaPath : 'apps/api/schema.graphql',

  // aws
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    s3BucketName: process.env.bucketName
  },

  // s3 user
  s3: {
    signedUrlExpireTime: 3600 // in milliseconds
  },

  // email
  email: {
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PW,
    smtp: process.env.EMAIL_SMTP_PROVIDER,

    registrationExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h valid
    forgotPasswordExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h valid
    invitationExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 72, // 72h valid

    templateDirectory: resolve(
      __dirname,
      '../../..',
      'apps/server/src/app/email/templates'
    )
  },

  appDomain: 'http://localhost:4200/'
};
