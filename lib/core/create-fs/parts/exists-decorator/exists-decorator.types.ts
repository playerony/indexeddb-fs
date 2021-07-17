export interface ExistsDecoratorProps {
  rootDirectoryName: string;

  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
