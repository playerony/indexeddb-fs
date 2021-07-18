import { functionImportTest } from '@utils';

import { initializeObjectStoreDecorator } from '@core/utils';
import { isDirectoryDecorator } from './is-directory-decorator.function';
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

const isDirectory = isDirectoryDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

const createDirectory = createDirectoryDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

describe('isDirectory Function', () => {
  functionImportTest(isDirectory);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(isDirectory('root/test/')).rejects.toThrow('"root/test/" path is invalid.');
  });

  it('should throw an error when the user wants to check a directory that does not exist', async () => {
    await expect(isDirectory('directory')).rejects.toThrow('"directory" directory does not exist.');
  });

  it('should pass those scenarios', async () => {
    await createDirectory('files');
    await createDirectory('directories');

    await expect(isDirectory('files')).resolves.toBeTruthy();
    await expect(isDirectory('directories')).resolves.toBeTruthy();

    await writeFile('file', 'content');
    await expect(isDirectory('file')).resolves.toBeFalsy();

    await writeFile('files/file', 'content');
    await expect(isDirectory('files/file')).resolves.toBeFalsy();
    await expect(isDirectory('files')).resolves.toBeTruthy();
  });
});
