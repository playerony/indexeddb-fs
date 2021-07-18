import { functionImportTest } from '@utils';

import { initializeObjectStoreDecorator } from '@core/utils';
import { readFileDecorator } from './read-file-decorator.function';
import { isFileDecorator, existsDecorator, writeFileDecorator, createDirectoryDecorator } from '..';

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

const isFile = isFileDecorator({ exists, rootDirectoryName, initializeObjectStore });

const readFile = readFileDecorator({ isFile, rootDirectoryName, initializeObjectStore });

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

describe('readFile Function', () => {
  functionImportTest(readFile);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(readFile('test//test2 ')).rejects.toThrow('"test//test2 " path is invalid.');
  });

  it('should throw an error when the file does not exist', async () => {
    await expect(readFile('file.txt')).rejects.toThrow('"file.txt" file does not exist.');
    await expect(readFile('test/file.txt')).rejects.toThrow('"test/file.txt" file does not exist.');
  });

  it('should throw type error when selected target is not a file', async () => {
    await createDirectory('directory_as_a_file');
    await expect(exists('directory_as_a_file')).resolves.toBeTruthy();

    await expect(readFile('directory_as_a_file')).rejects.toThrow(
      '"directory_as_a_file" is not a file.',
    );
  });

  it('should return content of found file', async () => {
    await writeFile('file.txt', 'test content');

    await expect(readFile('file.txt')).resolves.toEqual('test content');
  });
});
