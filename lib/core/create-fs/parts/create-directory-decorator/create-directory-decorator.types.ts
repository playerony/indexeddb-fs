export interface CreateDirectoryDecoratorProps {
  rootDirectoryName: string;

  isFile: (fullPath: string) => Promise<boolean>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
