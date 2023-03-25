import path from 'path';

import { getDirectoryName, formatAndValidateFullPath } from '@utils';

import { IFileEntry } from '@types';
import { IMoveFileInstanceProps } from './move-file-instance.types';

export const moveFileInstance =
  ({ exists, isDirectory, isFile, removeFile, rootDirectoryName, updateFileDetails }: IMoveFileInstanceProps) =>
  async <TData = unknown>(sourcePath: string, destinationPath: string): Promise<IFileEntry<TData>> => {
    const verifiedSourcePath = formatAndValidateFullPath(sourcePath, rootDirectoryName);
    const verifiedDestinationPath = formatAndValidateFullPath(destinationPath, rootDirectoryName);

    const sourceIsOfTypeFile = await isFile(verifiedSourcePath);

    if (!sourceIsOfTypeFile) {
      throw new Error(`"${verifiedSourcePath}" source is not a file.`);
    }

    const destinationDirectory = getDirectoryName(verifiedDestinationPath, rootDirectoryName);
    const destinationDirectoryIsOfTypeDirectory = await isDirectory(destinationDirectory);

    if (!destinationDirectoryIsOfTypeDirectory) {
      throw new Error(`"${destinationDirectory}" destination directory does not exist.`);
    }

    const destinationPathIsAlreadyTaken = await exists(verifiedDestinationPath);

    if (destinationPathIsAlreadyTaken) {
      throw new Error(`"${verifiedDestinationPath}" is already taken.`);
    }

    const destinationFilename = path.basename(verifiedDestinationPath);

    const newFileDetails = await updateFileDetails(verifiedSourcePath, {
      name: destinationFilename,
      directory: destinationDirectory,
      fullPath: verifiedDestinationPath,
    });

    await removeFile(verifiedSourcePath);

    return newFileDetails as IFileEntry<TData>;
  };
