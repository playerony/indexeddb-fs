import { formatAndValidateFullPath } from '@utils';

import { IReadDirectoryDecoratorProps, IReadDirectoryDecoratorOutput } from './read-directory-decorator.types';
import { IFileEntry, EEntryType, IDirectoryEntry } from '@types';

export const readDirectoryDecorator =
  ({ isDirectory, openCursor, rootDirectoryName }: IReadDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<IReadDirectoryDecoratorOutput> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeDirectory = await isDirectory(fullPath);

    if (!targetIsOfTypeDirectory) {
      throw new Error(`"${verifiedFullPath}" is not a directory.`);
    }

    const foundFiles: IFileEntry[] = [];
    const foundDirectories: IDirectoryEntry[] = [];

    const onResolve = ({ result }: IDBRequest, resolve: (value: unknown) => void) => {
      if (result) {
        const { value } = result;

        if (value.type === EEntryType.FILE) {
          const { data, ...restProps } = value;

          foundFiles.push(restProps);
        } else if (value.type === EEntryType.DIRECTORY && !value.isRoot) {
          foundDirectories.push(value);
        }

        result.continue();
      } else {
        const filesCount = foundFiles.length;
        const directoriesCount = foundDirectories.length;
        const isEmpty = filesCount === 0 && directoriesCount === 0;

        resolve({
          isEmpty,
          filesCount,
          directoriesCount,
          files: foundFiles,
          directories: foundDirectories,
        });
      }
    };

    // @ts-expect-error
    return openCursor(verifiedFullPath, onResolve);
  };
