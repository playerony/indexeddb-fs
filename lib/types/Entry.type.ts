export enum EEntryType {
  DIRECTORY = 'directory',
  FILE = 'file',
}

interface IEntry<TType extends EEntryType> {
  createdAt: number;
  directory: string;
  fullPath: string;
  name: string;
  type: TType;
}

export interface IFileEntry<TData = unknown> extends IEntry<EEntryType.FILE> {
  data: TData;
}

export interface IDirectoryEntry extends IEntry<EEntryType.DIRECTORY> {
  isRoot: boolean;
}
