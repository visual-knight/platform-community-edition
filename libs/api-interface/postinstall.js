const { Role, PrismaClient } = require('@generated/photonjs');
const uuidAPIKey = require('uuid-apikey');
const { genSaltSync, hash } = require('bcryptjs');

const prisma = new PrismaClient();

async function runSetup() {
  await prisma.connect();
  if ((await prisma.user.findMany()).length === 0) {
    const email = process.env.EMAIL || 'visual-knight-community@example.com';
    const password = process.env.PASSWORD || 'yourPassw0rd!';
    await createAdminUser(email, password);
  }
  await prisma.disconnect();
}

async function createAdminUser(email, password) {
  const salt = genSaltSync(10);
  const hashedPassword = await hash(password, salt);
  const adminUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      apiKey: uuidAPIKey.create({ noDashes: true }).apiKey,
      role: Role.ADMIN
    }
  });

  console.log('#########################');
  console.log('## CREATING ADMIN USER ##');
  console.log('#########################');
  console.log('');
  console.log(`The user with the email "${email}" and password "${password}" was created`);
  console.log(`The Api key is: ${adminUser.apiKey}`);
}

runSetup();
