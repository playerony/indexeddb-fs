import { getDirectoryName, formatAndValidateFullPath } from '@utils';

import { IFileEntry } from '@types';
import { IRenameFileDecoratorProps } from './rename-file-decorator.types';

export const renameFileDecorator =
  ({ exists, isFile, removeFile, rootDirectoryName, updateFileDetails }: IRenameFileDecoratorProps) =>
  async <TData = unknown>(fullPath: string, newFilename: string): Promise<IFileEntry<TData>> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const sourceIsOfTypeFile = await isFile(verifiedFullPath);

    if (!sourceIsOfTypeFile) {
      throw new Error(`"${verifiedFullPath}" is not a file.`);
    }

    const pathDirectory = getDirectoryName(verifiedFullPath, rootDirectoryName);
    const newFullPath = `${pathDirectory}/${newFilename}`;

    const newFullPathIsAlreadyTaken = await exists(newFullPath);

    if (newFullPathIsAlreadyTaken) {
      throw new Error(`"${newFullPath}" is already taken.`);
    }

    const updatedFileDetails = await updateFileDetails<TData>(verifiedFullPath, {
      name: newFilename,
      fullPath: newFullPath,
    });

    await removeFile(verifiedFullPath);

    return updatedFileDetails;
  };
