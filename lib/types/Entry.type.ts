export type EntryType = 'file' | 'directory';

interface Entry<TType extends EntryType> {
  type: TType;
  name: string;
  fullPath: string;
  directory: string;
  createdAt: number;
}

export interface FileEntry<TData = any> extends Entry<'file'> {
  data: TData;
}

export interface DirectoryEntry extends Entry<'directory'> {}
