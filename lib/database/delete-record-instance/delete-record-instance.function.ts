import { IDeleteRecordInstanceProps } from './delete-record-instance.types';

export const deleteRecordInstance =
  ({ initializeObjectStore }: IDeleteRecordInstanceProps) =>
  async (key: IDBValidKey | IDBKeyRange): Promise<void> => {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.delete(key);

      request.onerror = reject;

      request.onsuccess = () => resolve();
    });
  };
