export interface CreateRootDirectoryDecoratorProps {
  rootDirectoryName: string;

  putRecord: <TValue = any>(value: TValue, key?: IDBValidKey) => Promise<TValue>;
}
