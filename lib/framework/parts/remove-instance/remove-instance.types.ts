export interface IRemoveInstanceProps {
  deleteRecord: (key: IDBValidKey | IDBKeyRange) => Promise<void>;
  exists: (fullPath: string) => Promise<boolean>;
  rootDirectoryName: string;
}
