export interface IWriteFileDecoratorProps {
  isDirectory: (fullPath: string) => Promise<boolean>;

  putRecord: <TValue = unknown>(value: TValue, key?: IDBValidKey) => Promise<TValue>;
  rootDirectoryName: string;
}
