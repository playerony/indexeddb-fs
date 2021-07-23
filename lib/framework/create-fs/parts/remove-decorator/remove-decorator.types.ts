export interface RemoveDecoratorProps {
  rootDirectoryName: string;

  exists: (fullPath: string) => Promise<boolean>;
  deleteRecord: (key: IDBValidKey | IDBKeyRange) => Promise<void>;
}
