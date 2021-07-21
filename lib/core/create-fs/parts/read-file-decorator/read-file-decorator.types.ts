import { FileEntry } from '@types';

export interface ReadFileDecoratorProps {
  fileDetails: <TData = any>(fullPath: string) => Promise<FileEntry<TData>>;
}
