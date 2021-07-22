import { createFs } from '@core';
import { functionImportTest } from '@utils';

import { initializeObjectStoreDecorator } from '@database';
import { createRootDirectoryDecorator } from './create-root-directory-decorator.function';

const { exists, rootDirectoryName } = createFs({
  databaseVersion: 1,
  rootDirectoryName: 'root',
  objectStoreName: 'objectStoreName',
  databaseName: 'createRootDirectory',
});

const initializeObjectStore = initializeObjectStoreDecorator({
  databaseVersion: 1,
  databaseName: 'databaseName',
  objectStoreName: 'objectStoreName',
});

const createRootDirectory = createRootDirectoryDecorator({
  rootDirectoryName,
  initializeObjectStore,
});

describe('createRootDirectory Function', () => {
  functionImportTest(createRootDirectory);

  it('should create and return root directory', async () => {
    const root = await createRootDirectory();
    await expect(exists('roo')).resolves.toBeFalsy();
    await expect(exists('root')).resolves.toBeTruthy();

    expect(root.isRoot).toBeTruthy();
    expect(root.name).toEqual('root');
    expect(root.fullPath).toEqual('root');
    expect(root.directory).toEqual('root');
    expect(root.type).toEqual('directory');
  });
});
