export interface IOpenCursorInstanceProps {
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
