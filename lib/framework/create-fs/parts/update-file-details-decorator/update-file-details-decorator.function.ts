import path from 'path';

import { tryCatchWrapper } from '@utils';
import { formatAndValidateFullPath } from '@framework/utils';

import { FileEntry } from '@types';
import { UpdateFileDetailsDecoratorProps } from './update-file-details-decorator.types';

export const updateFileDetailsDecorator =
  ({ putRecord, isDirectory, fileDetails, rootDirectoryName }: UpdateFileDetailsDecoratorProps) =>
  async <TData = any>(
    fullPath: string,
    newFileEntry: Partial<FileEntry<TData>>,
  ): Promise<FileEntry<TData>> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const directory = path.dirname(verifiedFullPath);
    const doesDirectoryExists = await isDirectory(directory);

    if (!doesDirectoryExists) {
      throw new Error(`"${directory}" directory does not exist.`);
    }

    const targetIsTypeOfDirectory = await tryCatchWrapper(
      () => isDirectory(verifiedFullPath),
      () => false,
    );

    if (targetIsTypeOfDirectory) {
      throw new Error(
        `"${verifiedFullPath}" you cannot update a file with the same name as the directory.`,
      );
    }

    const existFileDetails = await fileDetails(verifiedFullPath);
    const concatedFileDetails = { ...existFileDetails, ...newFileEntry };

    return putRecord(concatedFileDetails);
  };