export interface IDeleteRecordInstanceProps {
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
