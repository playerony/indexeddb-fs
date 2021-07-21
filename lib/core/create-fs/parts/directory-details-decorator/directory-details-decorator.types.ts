export interface DirectoryDetailsDecoratorProps {
  rootDirectoryName: string;

  isDirectory: (fullPath: string) => Promise<boolean>;
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
