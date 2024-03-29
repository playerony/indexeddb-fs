import { IDirectoryEntry, IFileEntry } from '@types';

export interface IDetailsInstanceProps {
  directoryDetails: (fullPath: string) => Promise<IDirectoryEntry>;
  exists: (fullPath: string) => Promise<boolean>;
  fileDetails: (fullPath: string) => Promise<IFileEntry<unknown>>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  isFile: (fullPath: string) => Promise<boolean>;
  rootDirectoryName: string;
}
