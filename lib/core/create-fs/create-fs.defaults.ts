import { CreateFsProps } from './create-fs.types';

export const defaultProps: Required<CreateFsProps> = {
  databaseVersion: 1,
  objectStoreName: 'files',
  rootDirectoryName: 'root',
  databaseName: 'indexeddb-fs',
};
