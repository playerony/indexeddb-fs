import { IFileEntry } from '@types';

export interface IReadFileDecoratorProps {
  fileDetails: <TData = unknown>(fullPath: string) => Promise<IFileEntry<TData>>;
}
