import { DeleteRecordDecoratorProps } from './delete-record-decorator.types';

export const deleteRecordDecorator =
  ({ initializeObjectStore }: DeleteRecordDecoratorProps) =>
  async (key: IDBValidKey | IDBKeyRange): Promise<void> => {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.delete(key);

      request.onerror = reject;

      request.onsuccess = () => resolve();
    });
  };
