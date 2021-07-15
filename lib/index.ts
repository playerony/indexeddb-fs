import { createFS } from './createFS.function';

const fs = createFS({ databaseName: 'test-db-4' });

const doActions = async () => {
  await fs.writeFile('foo/test.txt', 'test 123');

  const content = await fs.readFile('foo/test.txt');

  // eslint-disable-next-line no-console
  console.log(content);
};

doActions();
