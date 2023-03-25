import { formatAndValidateFullPath } from '@utils';

import { IDirectoryEntry } from '@types';
import { IDirectoryDetailsInstanceProps } from './directory-details-instance.types';

const onResolve = ({ result }: IDBRequest) => result;

export const directoryDetailsInstance =
  ({ getRecord, isDirectory, rootDirectoryName }: IDirectoryDetailsInstanceProps) =>
  async (fullPath: string): Promise<IDirectoryEntry> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeDirectory = await isDirectory(fullPath);

    if (!targetIsOfTypeDirectory) {
      throw new Error(`"${verifiedFullPath}" is not a directory.`);
    }

    return getRecord(verifiedFullPath, onResolve);
  };
