import { formatAndValidateFullPath, getDirectoryName } from '@utils';

import { IFileEntry } from '@types';

import { ICopyFileInstanceProps } from './copy-file-instance.types';

export const copyFileInstance =
  ({ exists, fileDetails, isDirectory, isFile, rootDirectoryName, writeFile }: ICopyFileInstanceProps) =>
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

    const sourceFileDetails = await fileDetails(verifiedSourcePath);

    return writeFile<TData>(verifiedDestinationPath, sourceFileDetails.data as TData);
  };
