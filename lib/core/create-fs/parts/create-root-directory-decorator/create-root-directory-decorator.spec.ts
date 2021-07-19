import { createFs } from '@core';
import { functionImportTest } from '@utils';

const { exists, createRootDirectory } = createFs({
  databaseVersion: 1,
  rootDirectoryName: 'root',
  databaseName: 'databaseName',
  objectStoreName: 'objectStoreName',
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
