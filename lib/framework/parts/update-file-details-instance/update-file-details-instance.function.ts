import { formatAndValidateFullPath, getDirectoryName, tryCatchWrapper } from '@utils';

import { IFileEntry } from '@types';

import { IUpdateFileDetailsInstanceProps } from './update-file-details-instance.types';

export const updateFileDetailsInstance =
  ({ fileDetails, isDirectory, putRecord, rootDirectoryName }: IUpdateFileDetailsInstanceProps) =>
  async <TData = unknown>(fullPath: string, newFileEntry: Partial<IFileEntry<TData>>): Promise<IFileEntry<TData>> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    if (verifiedFullPath === rootDirectoryName) {
      throw new Error(`Root directory: "${verifiedFullPath}" cannot be updated.`);
    }

    const directory = getDirectoryName(verifiedFullPath, rootDirectoryName);
    const doesDirectoryExists = await isDirectory(directory);

    if (!doesDirectoryExists) {
      throw new Error(`"${directory}" is not a directory.`);
    }

    const targetIsTypeOfDirectory = await tryCatchWrapper(
      () => isDirectory(verifiedFullPath),
      () => false,
    );

    if (targetIsTypeOfDirectory) {
      throw new Error(`"${verifiedFullPath}" you cannot update a directory.`);
    }

    const existFileDetails = await fileDetails(verifiedFullPath);
    const concatedFileDetails = { ...existFileDetails, ...newFileEntry };

    // @ts-expect-error
    return putRecord(concatedFileDetails);
  };
