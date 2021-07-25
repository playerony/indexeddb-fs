export interface ExistsDecoratorProps {
  rootDirectoryName: string;

  getRecord: <TValue>(
    query: IDBValidKey | IDBKeyRange,
    onResolve: (target: IDBRequest) => TValue,
  ) => Promise<TValue>;
}
