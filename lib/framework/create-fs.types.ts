import { IFileEntry, IDirectoryEntry } from '@types';
import { IReadDirectoryDecoratorOutput } from './parts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyFunction = (...args: any[]) => any;

export interface ICreateFsProps {
  databaseName?: string;
  databaseVersion?: number;
  objectStoreName?: string;
  rootDirectoryName?: string;
}

export interface ICreateFsOutput {
  copyFile: <TData = unknown>(sourcePath: string, destinationPath: string) => Promise<IFileEntry<TData>>;
  createDirectory: (fullPath: string) => Promise<IDirectoryEntry>;
  databaseName: string;
  databaseVersion: number;
  details: (fullPath: string) => Promise<IFileEntry<unknown> | IDirectoryEntry>;
  directoryDetails: (fullPath: string) => Promise<IDirectoryEntry>;
  exists: (fullPath: string) => Promise<boolean>;
  fileDetails: <TData = unknown>(fullPath: string) => Promise<IFileEntry<TData>>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  isFile: (fullPath: string) => Promise<boolean>;
  moveFile: <TData = unknown>(sourcePath: string, destinationPath: string) => Promise<IFileEntry<TData>>;
  objectStoreName: string;
  readDirectory: (fullPath: string) => Promise<IReadDirectoryDecoratorOutput>;
  readFile: <TData = unknown>(fullPath: string) => Promise<TData>;
  remove: (fullPath: string) => Promise<void>;
  removeDirectory: (fullPath: string) => Promise<void>;
  removeFile: (fullPath: string) => Promise<void>;
  renameFile: <TData = unknown>(fullPath: string, newFilename: string) => Promise<IFileEntry<TData>>;
  rootDirectoryName: string;
  writeFile: <TData = unknown>(fullPath: string, data: TData) => Promise<IFileEntry<TData>>;
}
