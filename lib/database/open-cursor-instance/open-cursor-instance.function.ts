import { OBJECT_STORE_INDEX_NAME } from '@constants';

import { IOpenCursorInstanceProps } from './open-cursor-instance.types';

export const openCursorInstance =
  ({ initializeObjectStore }: IOpenCursorInstanceProps) =>
  async <TValue>(
    value: unknown,
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
