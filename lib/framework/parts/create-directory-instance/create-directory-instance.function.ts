import path from 'path';

import { tryCatchWrapper, getDirectoryName, formatAndValidateFullPath } from '@utils';

import { EEntryType, IDirectoryEntry } from '@types';
import { ICreateDirectoryInstanceProps } from './create-directory-instance.types';

export const createDirectoryInstance =
  ({ isDirectory, isFile, putRecord, rootDirectoryName }: ICreateDirectoryInstanceProps) =>
  async (fullPath: string): Promise<IDirectoryEntry> => {
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
      throw new Error(`"${verifiedFullPath}" you cannot create a directory with the same name as the file.`);
    }

    const entry: IDirectoryEntry = {
      directory,
      isRoot: false,
      name: basename,
      createdAt: Date.now(),
      type: EEntryType.DIRECTORY,
      fullPath: verifiedFullPath,
    };

    return putRecord(entry);
  };
