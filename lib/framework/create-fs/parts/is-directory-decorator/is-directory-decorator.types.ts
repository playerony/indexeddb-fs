export interface IsDirectoryDecoratorProps {
  rootDirectoryName: string;

  getRecord: <TValue>(
    query: IDBValidKey | IDBKeyRange,
    onResolve: (target: IDBRequest) => TValue,
  ) => Promise<TValue>;
  exists: (fullPath: string) => Promise<boolean>;
}
