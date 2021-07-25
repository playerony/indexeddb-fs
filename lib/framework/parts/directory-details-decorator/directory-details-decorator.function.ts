import { formatAndValidateFullPath } from '@utils';

import { DirectoryEntry } from '@types';
import { DirectoryDetailsDecoratorProps } from './directory-details-decorator.types';

const onResolve = ({ result }: IDBRequest) => result;

export const directoryDetailsDecorator =
  ({ getRecord, isDirectory, rootDirectoryName }: DirectoryDetailsDecoratorProps) =>
  async (fullPath: string): Promise<DirectoryEntry> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeDirectory = await isDirectory(fullPath);
    if (!targetIsOfTypeDirectory) {
      throw new Error(`"${verifiedFullPath}" is not a directory.`);
    }

    return getRecord(verifiedFullPath, onResolve);
  };
