import { functionImportTest } from '@utils';
import { initializeObjectStoreInstance } from './initialize-object-store-instance.function';

describe('initializeObjectStoreInstance Function', () => {
  functionImportTest(initializeObjectStoreInstance);

  it('should return nested function to call', () => {
    const initializeObjectStore = initializeObjectStoreInstance({
      databaseVersion: 1,
      databaseName: 'databaseName',
      objectStoreName: 'objectStoreName',
    });

    expect(typeof initializeObjectStore).toEqual('function');
  });

  it('should initialize object store', async () => {
    const initializeObjectStore = initializeObjectStoreInstance({
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
