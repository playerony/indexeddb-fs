import { functionImportTest } from '@utils';

import { existsDecorator, writeFileDecorator } from '..';
import { initializeObjectStoreDecorator } from '@core/utils';
import { removeFileDecorator } from './remove-file-decorator.function';

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

const removeFile = removeFileDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

describe('removeFile Function', () => {
  functionImportTest(removeFile);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(removeFile('test//test2 ')).rejects.toThrow('"test//test2 " path is invalid.');
  });

  it('should throw an error when the user wants to delete a file that does not exist', async () => {
    await expect(removeFile('file.txt')).rejects.toThrow('"file.txt" file does not exist.');
  });

  it('should remove created file in root directory', async () => {
    await writeFile('file1.txt', 'test content');

    await removeFile('file1.txt');
    await expect(exists('file1.txt')).resolves.toBeFalsy();
  });
});
