import { FileEntry, DirectoryEntry } from '@types';
import { ReadDirectoryDecoratorOutput } from './parts';

export type AnyFunction = (...args: any[]) => any;

export interface CreateFsProps {
  databaseName?: string;
  databaseVersion?: number;
  objectStoreName?: string;
  rootDirectoryName?: string;
}

export interface CreateFsOutput {
  databaseName: string;
  databaseVersion: number;
  objectStoreName: string;
  rootDirectoryName: string;
  remove: (fullPath: string) => Promise<void>;
  exists: (fullPath: string) => Promise<boolean>;
  isFile: (fullPath: string) => Promise<boolean>;
  removeFile: (fullPath: string) => Promise<void>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  removeDirectory: (fullPath: string) => Promise<void>;
  readFile: <TData = any>(fullPath: string) => Promise<TData>;
  createDirectory: (fullPath: string) => Promise<DirectoryEntry>;
  directoryDetails: (fullPath: string) => Promise<DirectoryEntry>;
  details: (fullPath: string) => Promise<FileEntry<any> | DirectoryEntry>;
  fileDetails: <TData = any>(fullPath: string) => Promise<FileEntry<TData>>;
  readDirectory: (fullPath: string) => Promise<ReadDirectoryDecoratorOutput>;
  writeFile: <TData = any>(fullPath: string, data: TData) => Promise<FileEntry<TData>>;
}
