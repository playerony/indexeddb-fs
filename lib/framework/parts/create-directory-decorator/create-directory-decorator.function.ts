import path from 'path';

import { tryCatchWrapper, getDirectoryName, formatAndValidateFullPath } from '@utils';

import { EntryType, DirectoryEntry } from '@types';
import { CreateDirectoryDecoratorProps } from './create-directory-decorator.types';

export const createDirectoryDecorator =
  ({ isFile, putRecord, isDirectory, rootDirectoryName }: CreateDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<DirectoryEntry> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);
    if (verifiedFullPath === rootDirectoryName) {
      throw new Error(`Root directory: "${verifiedFullPath}" already exist.`);
    }

    const basename = path.basename(verifiedFullPath);
    const directory = getDirectoryName(verifiedFullPath, rootDirectoryName);

    const doesDirectoryExists = await isDirectory(directory);
    if (!doesDirectoryExists) {
      throw new Error(`"${directory}" is not a directory.`);
    }

    const targetIsTypeOfFile = await tryCatchWrapper(
      () => isFile(verifiedFullPath),
      () => false,
    );

    if (targetIsTypeOfFile) {
      throw new Error(
        `"${verifiedFullPath}" you cannot create a directory with the same name as the file.`,
      );
    }

    const entry: DirectoryEntry = {
      directory,
      isRoot: false,
      name: basename,
      createdAt: Date.now(),
      type: EntryType.DIRECTORY,
      fullPath: verifiedFullPath,
    };

    return putRecord(entry);
  };
