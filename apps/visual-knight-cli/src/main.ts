// #!/usr/bin/env node

import { Command } from 'commander';
import { prependVisualKnightHeader } from './utils/utils';
import { configureSetupCommand } from './commands/setup';

const program = new Command();

program
  .version('0.0.1', '-v, --version')
  .name('visual-knight')
  .usage('command [options]')
  .description('Visual Knight cli to manage your an instance');

configureSetupCommand(program);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp(prependVisualKnightHeader);
}
