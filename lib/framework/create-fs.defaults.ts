import { ICreateFsProps } from './create-fs.types';

export const defaultProps: Required<ICreateFsProps> = {
  databaseVersion: 1,
  objectStoreName: 'files',
  rootDirectoryName: 'root',
  databaseName: 'indexeddb-fs',
};
