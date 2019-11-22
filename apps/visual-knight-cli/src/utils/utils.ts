import { red } from 'chalk';
import { textSync } from 'figlet';

export const VISUAL_KNIGHT_CLI_HEADER = red(
  textSync('visual knight - cli', { horizontalLayout: 'full' })
);

export function prependVisualKnightHeader(text: string) {
  return `${VISUAL_KNIGHT_CLI_HEADER}\n${text}`;
}
