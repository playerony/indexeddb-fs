import { createFS } from './createFS.function';

const fs = createFS({ databaseName: 'test-db-4' });

const doActions = async () => {
  await fs.createDirectory('foo3/foo4');

  const content = await fs.readDirectory('foo3');

  console.log(content);
};

doActions();
