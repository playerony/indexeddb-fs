import { createFS } from '@core';

const fs = createFS({ databaseName: 'test-db-4' });

const doActions = async () => {
  console.log(await fs.createDirectory('foo3/f'));

  const exists1 = await fs.exists('foo3');
  const exists2 = await fs.exists('foo5');

  console.log(exists1, exists2);
};

doActions();
