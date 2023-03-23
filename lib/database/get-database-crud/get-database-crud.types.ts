export interface IGetDatabaseCrudProps {
  databaseName: string;
  databaseVersion: number;
  objectStoreName: string;
}

export interface IGetDatabaseCrudOutput {
  deleteRecord: (key: IDBValidKey | IDBKeyRange) => Promise<void>;
  getRecord: <TValue>(query: IDBValidKey | IDBKeyRange, onResolve: (target: IDBRequest) => TValue) => Promise<TValue>;
  openCursor: <TValue>(
    value: unknown,
    onResolve: (target: IDBRequest, resolve: (value: TValue) => void) => TValue,
  ) => Promise<TValue>;
  putRecord: <TValue = unknown>(value: TValue, key?: IDBValidKey) => Promise<TValue>;
}
