import { formatAndValidateFullPath } from '@utils';

import { IDirectoryEntry } from '@types';
import { IDirectoryDetailsDecoratorProps } from './directory-details-decorator.types';

const onResolve = ({ result }: IDBRequest) => result;

export const directoryDetailsDecorator =
  ({ getRecord, isDirectory, rootDirectoryName }: IDirectoryDetailsDecoratorProps) =>
  async (fullPath: string): Promise<IDirectoryEntry> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeDirectory = await isDirectory(fullPath);

    if (!targetIsOfTypeDirectory) {
      throw new Error(`"${verifiedFullPath}" is not a directory.`);
    }

    return getRecord(verifiedFullPath, onResolve);
  };
