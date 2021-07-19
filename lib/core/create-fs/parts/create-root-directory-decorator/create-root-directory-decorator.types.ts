export interface CreateRootDirectoryDecoratorProps {
  rootDirectoryName: string;

  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
