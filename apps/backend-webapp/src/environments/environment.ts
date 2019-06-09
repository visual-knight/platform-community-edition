import { resolve } from 'path';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  stage: 'development',

  // auth environments
  refreshTokenLife: '1d',
  accessTokenLife: 3600,
  refreshTokenSecret: process.env.APP_SECRET,
  accessTokenSecret: process.env.APP_SECRET,

  // prisma
  prisma: {
    endpoint: 'http://localhost:4466/',
    secret: null,
    debug: true
  },

  // bcrypto
  saltRounds: 10,

  // stripe
  stripe: {
    stripeSecretKey: process.env.STRIPE_SECRET_KEY
  },

  // aws
  aws: {
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    iAmGroupName: process.env.IAM_GROUP_NAME,
    iAmPath: process.env.IAM_PATH,
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

  appDomain: process.env.APP_DOMAIN
};
