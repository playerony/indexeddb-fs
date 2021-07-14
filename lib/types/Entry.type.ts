export type EntryType = 'file' | 'directory';

export interface Entry {
  name: string;
  type: EntryType;
  fullPath: string;
  destinationDirectory: string;
}
