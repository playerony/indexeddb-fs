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
  hasRootDirectory: boolean;
  remove: (fullPath: string) => Promise<void>;
  exists: (fullPath: string) => Promise<boolean>;
  isFile: (fullPath: string) => Promise<boolean>;
  removeFile: (fullPath: string) => Promise<void>;
  createRootDirectory: () => Promise<DirectoryEntry>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  removeDirectory: (fullPath: string) => Promise<void>;
  createRootDirectoryIfDoesNotExist: () => Promise<void>;
  createDirectory: (fullPath: string) => Promise<DirectoryEntry>;
  readFile: <TData = any>(fullPath: string) => Promise<FileEntry<TData>>;
  readDirectory: (fullPath: string) => Promise<ReadDirectoryDecoratorOutput>;
  writeFile: <TData = any>(fullPath: string, data: TData) => Promise<FileEntry<TData>>;
}
