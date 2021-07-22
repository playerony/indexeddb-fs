import { DeleteByKeyDecoratorProps } from './delete-by-key-decorator.types';

export const deleteByKeyDecorator =
  ({ initializeObjectStore }: DeleteByKeyDecoratorProps) =>
  async (key: IDBValidKey | IDBKeyRange): Promise<void> => {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.delete(key);

      request.onerror = reject;
      request.onsuccess = () => resolve();
    });
  };
