export interface IDirectoryDetailsInstanceProps {
  getRecord: <TValue>(query: IDBValidKey | IDBKeyRange, onResolve: (target: IDBRequest) => TValue) => Promise<TValue>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  rootDirectoryName: string;
}
