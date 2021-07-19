import { createFs } from '@core';
import { functionImportTest } from '@utils';

const { createDirectory } = createFs({
  databaseVersion: 1,
  rootDirectoryName: 'root',
  databaseName: 'databaseName',
  objectStoreName: 'objectStoreName',
});

describe('createDirectory Function', () => {
  functionImportTest(createDirectory);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(createDirectory('test//test2 ')).rejects.toThrow(
      '"test//test2 " path is invalid.',
    );
  });

  it('should throw an error when user wants to create a folder in another one that does not exist', async () => {
    await expect(createDirectory('test/test2')).rejects.toThrow(
      '"root/test" directory does not exist.',
    );
  });

  it('should create a directory in root directory', async () => {
    const result = await createDirectory('test1');
    expect(result.name).toEqual('test1');
    expect(result.type).toEqual('directory');
    expect(result.directory).toEqual('root');
    expect(result.fullPath).toEqual('root/test1');
  });

  it('should create directory in other existing directory', async () => {
    const resultForTest1 = await createDirectory('test2');
    expect(resultForTest1.name).toEqual('test2');
    expect(resultForTest1.type).toEqual('directory');
    expect(resultForTest1.directory).toEqual('root');
    expect(resultForTest1.fullPath).toEqual('root/test2');

    const resultForTest2 = await createDirectory('test2/test3');
    expect(resultForTest2.name).toEqual('test3');
    expect(resultForTest2.type).toEqual('directory');
    expect(resultForTest2.directory).toEqual('root/test2');
    expect(resultForTest2.fullPath).toEqual('root/test2/test3');
  });
});
