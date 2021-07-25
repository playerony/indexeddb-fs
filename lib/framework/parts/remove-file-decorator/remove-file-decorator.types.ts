export interface RemoveFileDecoratorProps {
  rootDirectoryName: string;

  isFile: (fullPath: string) => Promise<boolean>;
  deleteRecord: (key: IDBValidKey | IDBKeyRange) => Promise<void>;
}
