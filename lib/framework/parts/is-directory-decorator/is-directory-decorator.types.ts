export interface IIsDirectoryDecoratorProps {
  exists: (fullPath: string) => Promise<boolean>;

  getRecord: <TValue>(query: IDBValidKey | IDBKeyRange, onResolve: (target: IDBRequest) => TValue) => Promise<TValue>;
  rootDirectoryName: string;
}
