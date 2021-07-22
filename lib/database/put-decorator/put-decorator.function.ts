import { PutDecoratorProps } from './put-decorator.types';

export const putDecorator =
  ({ initializeObjectStore }: PutDecoratorProps) =>
  async <TValue = any>(value: TValue, key?: IDBValidKey): Promise<TValue> => {
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const request = objectStore.put(value, key);

      request.onerror = reject;
      request.onsuccess = () => resolve(value);
    });
  };
