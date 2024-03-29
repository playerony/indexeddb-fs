import path from 'path';

import { formatAndValidateFullPath, getDirectoryName, tryCatchWrapper } from '@utils';

import { EEntryType, IFileEntry } from '@types';

import { IWriteFileInstanceProps } from './write-file-instance.types';

export const writeFileInstance =
  ({ isDirectory, putRecord, rootDirectoryName }: IWriteFileInstanceProps) =>
  async <TData = unknown>(fullPath: string, data: TData): Promise<IFileEntry<TData>> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    if (verifiedFullPath === rootDirectoryName) {
      throw new Error(`Root directory: "${verifiedFullPath}" cannot be a file.`);
    }

    const basename = path.basename(verifiedFullPath);
    const directory = getDirectoryName(verifiedFullPath, rootDirectoryName);

    const doesDirectoryExists = await isDirectory(directory);

    if (!doesDirectoryExists) {
      throw new Error(`"${directory}" directory does not exist.`);
    }

    const targetIsTypeOfDirectory = await tryCatchWrapper(
      () => isDirectory(verifiedFullPath),
      () => false,
    );

    if (targetIsTypeOfDirectory) {
      throw new Error(`"${verifiedFullPath}" you cannot create a file with the same name as the directory.`);
    }

    const entry: IFileEntry<TData> = {
      data,
      directory,
      name: basename,
      type: EEntryType.FILE,
      createdAt: Date.now(),
      fullPath: verifiedFullPath,
    };

    return putRecord(entry);
  };
