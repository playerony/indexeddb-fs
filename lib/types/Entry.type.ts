export enum EntryType {
  FILE = 'file',
  DIRECTORY = 'directory',
}

interface Entry<TType extends EntryType> {
  type: TType;
  name: string;
  fullPath: string;
  directory: string;
  createdAt: number;
}

export interface FileEntry<TData = any> extends Entry<EntryType.FILE> {
  data: TData;
}

export interface DirectoryEntry extends Entry<EntryType.DIRECTORY> {}
