import { FileEntry, DirectoryEntry } from '@types';

export interface DetailsDecoratorProps {
  rootDirectoryName: string;

  exists: (fullPath: string) => Promise<boolean>;
  isFile: (fullPath: string) => Promise<boolean>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  fileDetails: (fullPath: string) => Promise<FileEntry<any>>;
  directoryDetails: (fullPath: string) => Promise<DirectoryEntry>;
}
