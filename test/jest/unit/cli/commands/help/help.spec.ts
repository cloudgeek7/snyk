import * as help from '../../../../../../src/cli/commands/help';

describe('getRelativePath', () => {
  test('should return help path', () => {
    expect(help.getDocRelativePath(['apps'])).toBe(
      '../../help/cli-commands/apps.md',
    );
    expect(help.getDocRelativePath(['container'])).toBe(
      '../../help/cli-commands/container.md',
    );
    expect(help.getDocRelativePath(['iac', 'drift'])).toBe(
      '../../help/cli-commands/iac-drift.md',
    );
    expect(help.getDocRelativePath([])).toBe(
      '../../help/cli-commands/README.md',
    );
  });
});

describe('getSubcommandWithoutFlags', () => {
  test('should filter out CLI flags', () => {
    expect(
      help.getSubcommandWithoutFlags([
        '/usr/local/bin/node',
        '/home/test/index.js',
        'iac',
        'drift',
        '--help',
      ]),
    ).toEqual(['iac', 'drift']);
  });

  test('should return empty array', () => {
    expect(
      help.getSubcommandWithoutFlags([
        '/usr/local/bin/node',
        '/home/test/index.js',
      ]),
    ).toEqual([]);
  });

  test('should return filter out absolute paths', () => {
    expect(
      help.getSubcommandWithoutFlags([
        '/usr/local/bin/node',
        '/home/test/index.js',
        'iac',
        'test',
        '../plan.json',
      ]),
    ).toEqual(['iac', 'test']);
    expect(
      help.getSubcommandWithoutFlags([
        '/usr/local/bin/node',
        '/home/test/index.js',
        'iac',
        'test',
        'plan.json',
      ]),
    ).toEqual(['iac', 'test']);
    expect(
      help.getSubcommandWithoutFlags([
        '/usr/local/bin/node',
        '/home/test/index.js',
        'iac',
      ]),
    ).toEqual(['iac']);
  });
});
