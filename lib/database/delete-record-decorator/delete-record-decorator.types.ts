export interface DeleteRecordDecoratorProps {
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
