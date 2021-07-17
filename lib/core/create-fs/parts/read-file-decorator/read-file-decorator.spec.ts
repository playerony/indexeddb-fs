import { functionImportTest } from '@utils';

import { existsDecorator, writeFileDecorator } from '..';
import { initializeObjectStoreDecorator } from '@core/utils';
import { readFileDecorator } from './read-file-decorator.function';

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

const readFile = readFileDecorator({ rootDirectoryName, initializeObjectStore });

const writeFile = writeFileDecorator({
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
    await expect(readFile('file.txt')).rejects.toThrow('File not found.');
    await expect(readFile('test/file.txt')).rejects.toThrow('File not found.');
  });

  it('should return content of found file', async () => {
    await writeFile('file.txt', 'test content');

    await expect(readFile('file.txt')).resolves.toEqual('test content');
  });
});
