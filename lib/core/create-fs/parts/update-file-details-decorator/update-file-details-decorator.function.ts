import path from 'path';

import { tryCatchWrapper } from '@utils';
import { formatAndValidateFullPath } from '@core/utils';

import { FileEntry } from '@types';
import { UpdateFileDetailsDecoratorProps } from './update-file-details-decorator.types';

export const updateFileDetailsDecorator =
  ({
    isDirectory,
    fileDetails,
    rootDirectoryName,
    initializeObjectStore,
  }: UpdateFileDetailsDecoratorProps) =>
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
    const objectStore = await initializeObjectStore('readwrite');

    return new Promise((resolve, reject) => {
      const concatedFileDetails = { ...existFileDetails, ...newFileEntry };

      const request = objectStore.put(concatedFileDetails);

      request.onerror = reject;
      request.onsuccess = () => resolve(concatedFileDetails);
    });
  };
