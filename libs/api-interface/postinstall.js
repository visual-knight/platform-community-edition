const { Photon } = require('@generated/photonjs');
const uuidAPIKey = require('uuid-apikey');
const { genSaltSync, hash } = require('bcryptjs');

const photon = new Photon();

async function runSetup() {
  await photon.connect();
  if ((await photon.users.count()) === 0) {
    const email = process.env.EMAIL || 'visual-knight-community@example.com';
    const password = process.env.PASSWORD || 'yourPassw0rd!';
    await createAdminUser(email, password);
  }
  await photon.disconnect();
}

async function createAdminUser(email, password) {
  const salt = genSaltSync(10);
  const hashedPassword = await hash(password, salt);
  const adminUser = await photon.users.create({
    data: {
      email,
      password: hashedPassword,
      apiKey: uuidAPIKey.create({ noDashes: true }).apiKey
    }
  });

  console.log('#########################');
  console.log('## CREATING ADMIN USER ##');
  console.log('#########################');
  console.log('');
  console.log(
    `The user with the email "${email}" and password "${password}" was created`
  );
  console.log(`The Api key is: ${adminUser.apiKey}`);
}

runSetup();
