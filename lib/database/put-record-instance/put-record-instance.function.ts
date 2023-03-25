import { IPutRecordInstanceProps } from './put-record-instance.types';

export const putRecordInstance =
  ({ initializeObjectStore }: IPutRecordInstanceProps) =>
  async <TValue = unknown>(value: TValue): Promise<TValue> => {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.put(value);

      request.onerror = reject;
      request.onsuccess = () => resolve(value);
    });
  };
