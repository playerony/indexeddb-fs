import path from 'path';

import { formatAndValidateFullPath } from '@utils';

import { FileEntry } from '@types';
import { RenameFileDecoratorProps } from './rename-file-decorator.types';

export const renameFileDecorator =
  ({
    isFile,
    exists,
    removeFile,
    updateFileDetails,
    rootDirectoryName,
  }: RenameFileDecoratorProps) =>
  async <TData = any>(fullPath: string, newFilename: string): Promise<FileEntry<TData>> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const sourceIsOfTypeFile = await isFile(verifiedFullPath);
    if (!sourceIsOfTypeFile) {
      throw new Error(`"${verifiedFullPath}" is not a file.`);
    }

    const pathDirectory = path.dirname(verifiedFullPath);
    const newFullPath = `${pathDirectory}/${newFilename}`;

    const newFullPathIsAlreadyTaken = await exists(newFullPath);
    if (newFullPathIsAlreadyTaken) {
      throw new Error(`"${newFullPath}" is already taken.`);
    }

    const updatedFileDetails = await updateFileDetails(verifiedFullPath, {
      name: newFilename,
      fullPath: newFullPath,
    });

    await removeFile(verifiedFullPath);

    return updatedFileDetails;
  };
