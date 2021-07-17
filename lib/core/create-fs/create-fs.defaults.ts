import { CreateFSProps } from './create-fs.types';

export const defaultProps: Required<CreateFSProps> = {
  databaseVersion: 1,
  objectStoreName: 'files',
  rootDirectoryName: 'root',
  databaseName: 'indexeddb-fs-database',
};
