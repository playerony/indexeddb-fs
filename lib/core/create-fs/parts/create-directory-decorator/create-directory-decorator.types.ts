export interface CreateDirectoryDecoratorProps {
  rootDirectoryName: string;

  exists: (fullPath: string) => Promise<boolean>;
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
