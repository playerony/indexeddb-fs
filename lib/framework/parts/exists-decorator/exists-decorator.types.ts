export interface IExistsDecoratorProps {
  getRecord: <TValue>(query: IDBValidKey | IDBKeyRange, onResolve: (target: IDBRequest) => TValue) => Promise<TValue>;
  rootDirectoryName: string;
}
