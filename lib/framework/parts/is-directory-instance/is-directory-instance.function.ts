import { formatAndValidateFullPath } from '@utils';

import { EEntryType } from '@types';

import { IIsDirectoryInstanceProps } from './is-directory-instance.types';

const onResolve = ({ result }: IDBRequest) => Boolean(result?.type === EEntryType.DIRECTORY);

export const isDirectoryInstance =
  ({ exists, getRecord, rootDirectoryName }: IIsDirectoryInstanceProps) =>
  async (fullPath: string): Promise<boolean> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesDirectoryExists = await exists(verifiedFullPath);

    if (!doesDirectoryExists) {
      throw new Error(`"${verifiedFullPath}" directory does not exist.`);
    }

    return getRecord(verifiedFullPath, onResolve);
  };
