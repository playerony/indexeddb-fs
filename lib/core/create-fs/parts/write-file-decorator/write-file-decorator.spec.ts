import { functionImportTest } from '@utils';

import { initializeObjectStoreDecorator } from '@core/utils';
import { existsDecorator, createDirectoryDecorator } from '..';
import { writeFileDecorator } from './write-file-decorator.function';

const databaseVersion = 1;
const rootDirectoryName = 'root';
const databaseName = 'databaseName';
const objectStoreName = 'objectStoreName';

const initializeObjectStore = initializeObjectStoreDecorator({
  databaseName,
  databaseVersion,
  objectStoreName,
});

const exists = existsDecorator({ rootDirectoryName, initializeObjectStore });

const writeFile = writeFileDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

const createDirectory = createDirectoryDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

describe('writeFile Function', () => {
  functionImportTest(writeFile);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(writeFile('test//test2 ', 'content')).rejects.toThrow(
      '"test//test2 " path is invalid.',
    );
  });

  it('should throw an error when user wants to create a file in a folder that does not exist', async () => {
    await expect(createDirectory('test3/test2/test/file.txt')).rejects.toThrow(
      '"root/test3/test2/test" directory does not exist.',
    );
  });

  it('should create file in root directory', async () => {
    const result = await writeFile('file1.txt', 'test content');

    expect(result.type).toEqual('file');
    expect(result.name).toEqual('file1.txt');
    expect(result.directory).toEqual('root');
    expect(result.data).toEqual('test content');
    expect(result.fullPath).toEqual('root/file1.txt');
  });

  it('should create a file in other existing directory', async () => {
    await createDirectory('test2');
    const result = await writeFile('test2/file.txt', 'content');

    expect(result.type).toEqual('file');
    expect(result.data).toEqual('content');
    expect(result.name).toEqual('file.txt');
    expect(result.directory).toEqual('root/test2');
    expect(result.fullPath).toEqual('root/test2/file.txt');
  });

  it('should create a file with object data', async () => {
    await createDirectory('test2');
    const result = await writeFile('file3.txt', { test: 'object' });

    expect(result.type).toEqual('file');
    expect(result.name).toEqual('file3.txt');
    expect(result.directory).toEqual('root');
    expect(result.data).toEqual({ test: 'object' });
    expect(result.fullPath).toEqual('root/file3.txt');
  });
});