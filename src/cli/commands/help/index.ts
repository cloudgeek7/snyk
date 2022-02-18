import * as fs from 'fs';
import * as path from 'path';
import { renderMarkdown } from './markdown-renderer';
import { ArgsOptions, MethodArgs } from '../../args';

const DEFAULT_HELP = 'README';

function readHelpFile(filename: string): string {
  const file = fs.readFileSync(filename, 'utf8');
  return renderMarkdown(file);
}

export function getHelpFilePath(argv: string[]): string {
  if (argv[0] === 'help') {
    argv.shift();
  }
  const item: string = argv.join('-');

  return path.join(
    '../../help/cli-commands', // this is a relative path from the webpack dist directory
    `${item}.md`,
  );
}

export function getDocRelativePath(args: string[]): string {
  let item: string = args[0] || '';

  // cleanse the filename to only contain letters
  // aka: /\W/g but figured this was easier to read
  item = item.replace(/[^a-z0-9-]/gi, '');

  if (item === 'iac') {
    return getHelpFilePath(args);
  }

  return path.join(
    '../../help/cli-commands', // this is a relative path from the webpack dist directory
    item ? `${item}.md` : `${DEFAULT_HELP}.md`,
  );
}

export default async function help(...args: MethodArgs): Promise<string> {
  let rawArgv: string[] | MethodArgs = args;
  if (args.length > 1) {
    rawArgv = (args.pop() as ArgsOptions).rawArgv;
  }
  const formattedArgv = getSubcommandWithoutFlags(rawArgv as string[]);

  try {
    return readHelpFile(
      path.resolve(__dirname, getDocRelativePath(formattedArgv)),
    );
  } catch (error) {
    const filename = path.resolve(
      __dirname,
      '../../help/cli-commands',
      `${DEFAULT_HELP}.md`,
    );
    return readHelpFile(filename);
  }
}

export function getSubcommandWithoutFlags(argv: string[]): string[] {
  const formattedArgv: string[] = [];
  if (!argv) {
    return formattedArgv;
  }
  for (const arg of argv) {
    if (
      arg.indexOf('-') === 0 ||
      arg.indexOf('/') > -1 ||
      arg.indexOf('.') > -1
    ) {
      continue;
    }
    formattedArgv.push(arg);
  }
  return formattedArgv;
}
