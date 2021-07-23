export interface PutRecordDecoratorProps {
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
