import { createFS } from './createFS.function';

const fs = createFS({ databaseName: 'test-db-4' });

const doActions = async () => {
  await fs.writeFile('foo/test.txt', 'test');

  const directoryContent = await fs.readDirectory('foo');

  // eslint-disable-next-line no-console
  console.log(directoryContent);
};

doActions();
