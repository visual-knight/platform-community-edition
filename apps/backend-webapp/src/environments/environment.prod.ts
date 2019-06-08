export const environment = {
  production: true,
  stage: 'production',

  // auth environments
  refreshTokenLife: 3600 * 24,
  accessTokenLife: 3600,
  refreshTokenSecret: process.env.APP_SECRET,
  accessTokenSecret: process.env.APP_SECRET,

  // prisma
  prisma: {
    endpoint: 'http://localhost:4466',
    secret: 'MY_SECRET'
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
    iAmPath: process.env.IAM_PATH
  },

  // s3 user
  s3: {
    signedUrlExpireTime: 3600 // in milliseconds
  },

  // email
  email: {
    user: 'noreply@visual-knight.io',
    password: process.env.EMAIL_PW,
    smtp: 'smtp.1und1.de',

    registrationExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h valid
    forgotPasswordExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h valid
    invitationExpiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 72 // 72h valid
  },

  appDomain: process.env.APP_DOMAIN
};
