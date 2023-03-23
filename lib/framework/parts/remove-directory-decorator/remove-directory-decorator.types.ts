import { IReadDirectoryDecoratorOutput } from '..';

export interface IRemoveDirectoryDecoratorProps {
  isDirectory: (fullPath: string) => Promise<boolean>;

  readDirectory: (fullPath: string) => Promise<IReadDirectoryDecoratorOutput>;
  remove: (fullPath: string) => Promise<void>;
  rootDirectoryName: string;
}
