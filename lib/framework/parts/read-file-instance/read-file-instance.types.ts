import { IFileEntry } from '@types';

export interface IReadFileInstanceProps {
  fileDetails: <TData = unknown>(fullPath: string) => Promise<IFileEntry<TData>>;
}
