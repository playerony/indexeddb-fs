export interface IFileDetailsInstanceProps {
  getRecord: <TValue>(query: IDBValidKey | IDBKeyRange, onResolve: (target: IDBRequest) => TValue) => Promise<TValue>;
  isFile: (fullPath: string) => Promise<boolean>;
  rootDirectoryName: string;
}
