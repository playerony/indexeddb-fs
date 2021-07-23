export interface WriteFileDecoratorProps {
  rootDirectoryName: string;

  isDirectory: (fullPath: string) => Promise<boolean>;
  putRecord: <TValue = any>(value: TValue, key?: IDBValidKey) => Promise<TValue>;
}
