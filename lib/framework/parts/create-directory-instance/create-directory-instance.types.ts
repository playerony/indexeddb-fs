export interface ICreateDirectoryInstanceProps {
  isDirectory: (fullPath: string) => Promise<boolean>;
  isFile: (fullPath: string) => Promise<boolean>;
  putRecord: <TValue = unknown>(value: TValue, key?: IDBValidKey) => Promise<TValue>;
  rootDirectoryName: string;
}
