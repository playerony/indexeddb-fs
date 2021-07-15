export type EntryType = 'file' | 'directory';

interface Entry<TType extends EntryType> {
  dir: string;
  path: string;
  type: TType;
  createdAt: number;
}

export interface FileEntry<TData = any> extends Entry<'file'> {
  data: TData;
}

export interface DirectoryEntry extends Entry<'directory'> {}
