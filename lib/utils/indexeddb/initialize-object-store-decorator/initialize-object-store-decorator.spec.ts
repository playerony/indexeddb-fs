import { functionImportTest, initializeObjectStoreDecorator } from '@utils';

describe('initializeObjectStoreDecorator Function', () => {
  functionImportTest(initializeObjectStoreDecorator);

  it('should return nested function to call', () => {
    const initializeObjectStore = initializeObjectStoreDecorator({
      databaseVersion: 1,
      databaseName: 'databaseName',
      objectStoreName: 'objectStoreName',
    });

    expect(typeof initializeObjectStore).toEqual('function');
  });

  it('should initialize object store', async () => {
    const initializeObjectStore = initializeObjectStoreDecorator({
      databaseVersion: 1,
      databaseName: 'databaseName',
      objectStoreName: 'objectStoreName',
    });

    const objectStore = await initializeObjectStore('readonly');

    expect(Object.keys(objectStore)).toHaveLength(7);
    expect(objectStore.keyPath).toEqual('fullPath');
    expect(objectStore.indexNames).toEqual(['directory']);
    expect(objectStore.transaction.mode).toEqual('readonly');
    expect(objectStore.transaction.objectStoreNames).toEqual(['objectStoreName']);
  });
});
