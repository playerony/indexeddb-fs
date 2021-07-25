import { formatAndValidateFullPath } from '@utils';

import {
  ReadDirectoryDecoratorProps,
  ReadDirectoryDecoratorOutput,
} from './read-directory-decorator.types';
import { FileEntry, EntryType, DirectoryEntry } from '@types';

export const readDirectoryDecorator =
  ({ openCursor, isDirectory, rootDirectoryName }: ReadDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<ReadDirectoryDecoratorOutput> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeDirectory = await isDirectory(fullPath);
    if (!targetIsOfTypeDirectory) {
      throw new Error(`"${verifiedFullPath}" is not a directory.`);
    }

    const foundFiles: FileEntry[] = [];
    const foundDirectories: DirectoryEntry[] = [];

    const onResolve = ({ result }: IDBRequest, resolve: (value: any) => void) => {
      if (result) {
        const { value } = result;

        if (value.type === EntryType.FILE) {
          const { data, ...restProps } = value;

          foundFiles.push(restProps);
        } else if (value.type === EntryType.DIRECTORY && !value.isRoot) {
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

    return openCursor(verifiedFullPath, onResolve);
  };
