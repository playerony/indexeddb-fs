export interface IRemoveFileInstanceProps {
  deleteRecord: (key: IDBValidKey | IDBKeyRange) => Promise<void>;

  isFile: (fullPath: string) => Promise<boolean>;
  rootDirectoryName: string;
}
