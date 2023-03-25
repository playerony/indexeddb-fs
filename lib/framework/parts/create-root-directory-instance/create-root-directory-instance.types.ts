export interface ICreateRootDirectoryInstanceProps {
  putRecord: <TValue = unknown>(value: TValue, key?: IDBValidKey) => Promise<TValue>;
  rootDirectoryName: string;
}
