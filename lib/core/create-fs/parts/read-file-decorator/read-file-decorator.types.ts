export interface ReadFileDecoratorProps {
  rootDirectoryName: string;

  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
