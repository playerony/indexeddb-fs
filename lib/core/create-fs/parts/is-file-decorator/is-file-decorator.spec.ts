import { functionImportTest } from '@utils';

import { initializeObjectStoreDecorator } from '@core/utils';
import { isFileDecorator } from './is-file-decorator.function';
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

const isFile = isFileDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

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

describe('isFile Function', () => {
  functionImportTest(isFile);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(isFile('root/test/')).rejects.toThrow('"root/test/" path is invalid.');
  });

  it('should throw an error when the user wants to check a file that does not exist', async () => {
    await expect(isFile('file.txt')).rejects.toThrow('"file.txt" file does not exist.');
  });

  it('should pass those scenarios', async () => {
    await createDirectory('files');
    await createDirectory('directories');

    await expect(isFile('files')).resolves.toBeFalsy();
    await expect(isFile('directories')).resolves.toBeFalsy();

    await writeFile('file', 'content');
    await expect(isFile('file')).resolves.toBeTruthy();

    await writeFile('files/file', 'content');
    await expect(isFile('files/file')).resolves.toBeTruthy();
  });
});
