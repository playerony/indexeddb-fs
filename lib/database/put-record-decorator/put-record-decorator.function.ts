import { PutRecordDecoratorProps } from './put-record-decorator.types';

export const putRecordDecorator =
  ({ initializeObjectStore }: PutRecordDecoratorProps) =>
  async <TValue = any>(value: TValue): Promise<TValue> => {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.put(value);

      request.onerror = reject;
      request.onsuccess = () => resolve(value);
    });
  };
