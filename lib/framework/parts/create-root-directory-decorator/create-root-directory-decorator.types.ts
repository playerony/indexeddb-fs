export interface ICreateRootDirectoryDecoratorProps {
  putRecord: <TValue = unknown>(value: TValue, key?: IDBValidKey) => Promise<TValue>;

  rootDirectoryName: string;
}
