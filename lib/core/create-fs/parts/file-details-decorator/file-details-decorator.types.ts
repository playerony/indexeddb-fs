export interface FileDetailsDecoratorProps {
  rootDirectoryName: string;

  isFile: (fullPath: string) => Promise<boolean>;
  initializeObjectStore: (type: IDBTransactionMode) => Promise<IDBObjectStore>;
}
