import { formatAndValidateFullPath } from '@utils';

import { FileEntry, DirectoryEntry } from '@types';
import { DetailsDecoratorProps } from './details-decorator.types';

export const detailsDecorator =
  ({
    exists,
    isFile,
    isDirectory,
    fileDetails,
    directoryDetails,
    rootDirectoryName,
  }: DetailsDecoratorProps) =>
  async (fullPath: string): Promise<FileEntry<any> | DirectoryEntry> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesTargetExist = await exists(verifiedFullPath);
    if (!doesTargetExist) {
      throw new Error(`"${verifiedFullPath}" file or directory does not exist.`);
    }

    const targetIsOfTypeFile = await isFile(verifiedFullPath);
    const targetIsOfTypeDirectory = await isDirectory(verifiedFullPath);

    if (targetIsOfTypeFile && targetIsOfTypeDirectory) {
      throw new Error(`"${verifiedFullPath}" is a path of file and directory.`);
    }

    if (targetIsOfTypeFile) {
      return fileDetails(verifiedFullPath);
    }

    return directoryDetails(verifiedFullPath);
  };
