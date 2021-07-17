import { functionImportTest } from '@utils';

import { initializeObjectStoreDecorator } from '@core/utils';
import { readDirectoryDecorator } from './read-directory-decorator.function';
import { existsDecorator, writeFileDecorator, createDirectoryDecorator } from '..';

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

const readDirectory = readDirectoryDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

const createDirectory = createDirectoryDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

describe('readDirectory Function', () => {
  functionImportTest(readDirectory);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(readDirectory('//path')).rejects.toThrow('"//path" path is invalid.');
  });

  it('should throw an error when passed path does not exist', async () => {
    await expect(readDirectory('path')).rejects.toThrow('"path" directory does not exist.');
  });

  it('should return empty array when directory is empty', async () => {
    await createDirectory('test_directory');

    await expect(readDirectory('test_directory')).resolves.toEqual([]);
  });

  it('should return array of found objects', async () => {
    await createDirectory('test_directory');
    await writeFile('test_directory/file.txt', 'content');
    await createDirectory('test_directory/folder');

    const result = await readDirectory('test_directory');

    expect(result).toHaveLength(2);

    const [file, directory] = result;

    // @ts-ignore
    expect(file.data).toEqual('content');
    expect(file.type).toEqual('file');
    expect(file.name).toEqual('file.txt');
    expect(file.directory).toEqual('root/test_directory');
    expect(file.fullPath).toEqual('root/test_directory/file.txt');

    expect(directory.name).toEqual('folder');
    expect(directory.type).toEqual('directory');
    expect(directory.directory).toEqual('root/test_directory');
    expect(directory.fullPath).toEqual('root/test_directory/folder');
  });
});
