export interface OpenCursorDecoratorProps {
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
