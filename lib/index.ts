import { createFS } from '@core';

const fs = createFS({ databaseName: 'test-db-4', databaseVersion: 10 });

const doActions = async () => {
  console.log(await fs.createDirectory('foo2'));
  console.log(await fs.createDirectory('foo2/foo1'));
  console.log(await fs.writeFile('file.txt', 'file content'));
  console.log(await fs.writeFile('foo2/foo1/file.txt', 'file2 content'));
  console.log(await fs.readFile('foo2/foo1/file.txt'));

  const exists1 = await fs.exists('foo1');
  const exists2 = await fs.exists('foo2');

  console.log(exists1, exists2);
};

doActions();
