import { formatAndValidateFullPath } from '@utils';

import { IFileEntry } from '@types';
import { IFileDetailsInstanceProps } from './file-details-instance.types';

const onResolve = ({ result }: IDBRequest) => result;

export const fileDetailsInstance =
  ({ getRecord, isFile, rootDirectoryName }: IFileDetailsInstanceProps) =>
  async <TData = unknown>(fullPath: string): Promise<IFileEntry<TData>> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeFile = await isFile(verifiedFullPath);

    if (!targetIsOfTypeFile) {
      throw new Error(`"${verifiedFullPath}" is not a file.`);
    }

    return getRecord(verifiedFullPath, onResolve);
  };
