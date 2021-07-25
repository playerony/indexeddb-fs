import path from 'path';

import { formatAndValidateFullPath } from '@utils';

import { FileEntry } from '@types';
import { CopyFileDecoratorProps } from './copy-file-decorator.types';

export const copyFileDecorator =
  ({
    isFile,
    exists,
    writeFile,
    isDirectory,
    fileDetails,
    rootDirectoryName,
  }: CopyFileDecoratorProps) =>
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

    const sourceFileDetails = await fileDetails(verifiedSourcePath);

    return writeFile(verifiedDestinationPath, sourceFileDetails.data);
  };
