import { IReadDirectoryInstanceOutput } from '..';

export interface IRemoveDirectoryInstanceProps {
  isDirectory: (fullPath: string) => Promise<boolean>;
  readDirectory: (fullPath: string) => Promise<IReadDirectoryInstanceOutput>;
  remove: (fullPath: string) => Promise<void>;
  rootDirectoryName: string;
}
