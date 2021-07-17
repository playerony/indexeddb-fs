import { functionImportTest } from '@utils';

import { createDirectoryDecorator } from '..';
import { initializeObjectStoreDecorator } from '@core/utils';
import { existsDecorator } from './exists-decorator.function';

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
    await expect(exists('test')).resolves.toBeTruthy();
  });
});
