import { ReadDirectoryDecoratorOutput } from '..';

export interface RemoveDirectoryDecoratorProps {
  rootDirectoryName: string;

  remove: (fullPath: string) => Promise<void>;
  isDirectory: (fullPath: string) => Promise<boolean>;
  readDirectory: (fullPath: string) => Promise<ReadDirectoryDecoratorOutput>;
}
