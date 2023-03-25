import { IGetRecordInstanceProps } from './get-record-instance.types';

export const getRecordInstance =
  ({ initializeObjectStore }: IGetRecordInstanceProps) =>
  async <TValue>(query: IDBValidKey | IDBKeyRange, onResolve: (target: IDBRequest) => TValue): Promise<TValue> => {
    const objectStore = await initializeObjectStore('readonly');

    return new Promise((resolve, reject) => {
      const request = objectStore.get(query);

      request.onerror = reject;

      request.onsuccess = (event: Event) => resolve(onResolve(event?.target as IDBRequest));
    });
  };
