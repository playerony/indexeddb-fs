import { tryCatchWrapper, getDirectoryName, formatAndValidateFullPath } from '@utils';

import { FileEntry } from '@types';
import { UpdateFileDetailsDecoratorProps } from './update-file-details-decorator.types';

export const updateFileDetailsDecorator =
  ({ putRecord, isDirectory, fileDetails, rootDirectoryName }: UpdateFileDetailsDecoratorProps) =>
  async <TData = any>(
    fullPath: string,
    newFileEntry: Partial<FileEntry<TData>>,
  ): Promise<FileEntry<TData>> => {
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

    return putRecord(concatedFileDetails);
  };
