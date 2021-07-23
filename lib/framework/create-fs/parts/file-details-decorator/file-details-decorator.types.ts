export interface FileDetailsDecoratorProps {
  rootDirectoryName: string;

  getRecord: <TValue>(
    query: IDBValidKey | IDBKeyRange,
    onResolve: (target: IDBRequest) => TValue,
  ) => Promise<TValue>;
  isFile: (fullPath: string) => Promise<boolean>;
}
