import { OpenCursorDecoratorProps } from './open-cursor-decorator.types';

import { OBJECT_STORE_INDEX_NAME } from '@constants';

export const openCursorDecorator =
  ({ initializeObjectStore }: OpenCursorDecoratorProps) =>
  async <TValue>(
    value: any,
    onResolve: (target: IDBRequest, resolve: (value: TValue) => void) => TValue,
  ): Promise<TValue> => {
    const objectStore = await initializeObjectStore('readonly');
    const objectStoreIndex = objectStore.index(OBJECT_STORE_INDEX_NAME);

    const keyRange = IDBKeyRange.only(value);
    const request = objectStoreIndex.openCursor(keyRange);

    return new Promise((resolve, reject) => {
      request.onerror = reject;

      request.onsuccess = ({ target }: Event) => onResolve(target as IDBRequest, resolve);
    });
  };
