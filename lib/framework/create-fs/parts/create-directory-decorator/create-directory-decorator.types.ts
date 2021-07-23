export interface CreateDirectoryDecoratorProps {
  rootDirectoryName: string;

  isFile: (fullPath: string) => Promise<boolean>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  putRecord: <TValue = any>(value: TValue, key?: IDBValidKey) => Promise<TValue>;
}
