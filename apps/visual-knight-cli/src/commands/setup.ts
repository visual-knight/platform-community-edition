import { Command } from 'commander';
import { prompt } from 'inquirer';
import { resolve } from 'path';
import { existsSync, readdirSync } from 'fs';
import { ensureDir } from 'fs-extra';

enum Platform {
  OnPremise
  // AWS,
  // Azure,
  // Now
}

enum Database {
  Sqlite,
  Postgresql,
  Mysql
}

export function configureSetupCommand(program: Command) {
  program
    .command('setup')
    .description('Setup Visual Knight - CE')
    .action(() => {
      prompt([
        {
          name: 'path',
          type: 'input',
          message: 'Path to setup Visual Knight:',
          default: () => resolve(process.cwd()) + '/',
          validate: input => {
            const dirPath = resolve(process.cwd(), input);
            if (existsSync(dirPath) && readdirSync(dirPath).length > 0) {
              return `Directory "${dirPath}" is not empty! Pleas choose another one.`;
            }
            return true;
          }
        },
        {
          name: 'platform',
          type: 'list',
          message: 'Choose between following platforms',
          choices: [{ name: 'On premise', value: Platform.OnPremise }],
          default: 0
        },
        {
          name: 'database',
          type: 'list',
          message: 'Choose between following databases',
          choices: [
            { name: 'Sqlite', value: Database.Sqlite },
            { name: 'Postgresql', value: Database.Postgresql },
            { name: 'Mysql', value: Database.Mysql }
          ],
          default: 0
        },
        {
          name: 'databaseUri',
          type: 'input',
          message: 'Provide the uri to the database',
          default: answers => {
            switch (answers.database) {
              case Database.Mysql:
                return 'mysql://user:password@localhost:3306';

              case Database.Postgresql:
                return 'postgresql://user:password@localhost:5432';
            }
          },
          validate: async (input, answers) => {
            // TODO: Check connection
            // switch (answers.database) {
            //   case Database.Mysql:
            //     return 'mysql://user:password@localhost:3306';

            //   case Database.Postgresql:
            //     return 'postgresql://user:password@localhost:5432';
            // }
            return true;
          },
          when: answers => answers.database !== Database.Sqlite
        },
        {
          name: 'username',
          type: 'input',
          message: 'Your admin email address for the web application',
          validate: (input: string) =>
            input.length > 0 ? true : 'This is a required field'
        },
        {
          name: 'password',
          type: 'password',
          message: 'Your admin password for the web application',
          mask: true,
          validate: (input: string) =>
            input.length > 0 ? true : 'This is a required field'
        }
      ]).then(async answers => {
        console.log(answers);
        // await createDirectory(answers.path);
      });
    });
}

async function createDirectory(pathInput: string) {
  const dirPath = resolve(process.cwd(), pathInput);
  return ensureDir(dirPath);
}
