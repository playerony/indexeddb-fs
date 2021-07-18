import { functionImportTest } from '@utils';

import { initializeObjectStoreDecorator } from '@core/utils';
import { existsDecorator } from './exists-decorator.function';
import { writeFileDecorator, removeDecorator, createDirectoryDecorator } from '..';

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

const remove = removeDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

const createDirectory = createDirectoryDecorator({
  exists,
  rootDirectoryName,
  initializeObjectStore,
});

describe('exists Function', () => {
  functionImportTest(exists);

  it('should check if directory exists', async () => {
    await expect(exists('test')).resolves.toBeFalsy();

    await createDirectory('test');
    await expect(exists('tes')).resolves.toBeFalsy();
    await expect(exists('test')).resolves.toBeTruthy();
  });

  it('should check if file exists', async () => {
    await expect(exists('file.txt')).resolves.toBeFalsy();

    await writeFile('file.txt', 'test');
    await expect(exists('file.tx')).resolves.toBeFalsy();
    await expect(exists('file.txt')).resolves.toBeTruthy();
    await expect(exists('test/file.tx')).resolves.toBeFalsy();

    await remove('file.txt');
    await expect(exists('file.txt')).resolves.toBeFalsy();
  });
});
