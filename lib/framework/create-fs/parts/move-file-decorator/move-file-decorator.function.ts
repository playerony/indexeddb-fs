import path from 'path';

import { formatAndValidateFullPath } from '@framework/utils';

import { FileEntry } from '@types';
import { MoveFileDecoratorProps } from './move-file-decorator.types';

export const moveFileDecorator =
  ({
    isFile,
    exists,
    removeFile,
    isDirectory,
    updateFileDetails,
    rootDirectoryName,
  }: MoveFileDecoratorProps) =>
  async <TData = any>(sourcePath: string, destinationPath: string): Promise<FileEntry<TData>> => {
    const verifiedSourcePath = formatAndValidateFullPath(sourcePath, rootDirectoryName);
    const verifiedDestinationPath = formatAndValidateFullPath(destinationPath, rootDirectoryName);

    const sourceIsOfTypeFile = await isFile(verifiedSourcePath);
    if (!sourceIsOfTypeFile) {
      throw new Error(`"${verifiedSourcePath}" source is not a file.`);
    }

    const destinationDirectory = path.dirname(verifiedDestinationPath);
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

    return newFileDetails;
  };
