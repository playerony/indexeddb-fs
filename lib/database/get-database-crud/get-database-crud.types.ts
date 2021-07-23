export interface GetDatabaseCrudProps {
  databaseName: string;
  databaseVersion: number;
  objectStoreName: string;
}

export interface GetDatabaseCrudOutput {
  getRecord: <TValue>(
    query: IDBValidKey | IDBKeyRange,
    onResolve: (target: IDBRequest) => TValue,
  ) => Promise<TValue>;
  openCursor: <TValue>(
    value: any,
    onResolve: (target: IDBRequest, resolve: (value: TValue) => void) => TValue,
  ) => Promise<TValue>;
  deleteRecord: (key: IDBValidKey | IDBKeyRange) => Promise<void>;
  putRecord: <TValue = any>(value: TValue, key?: IDBValidKey) => Promise<TValue>;
}
