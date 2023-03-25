import { formatAndValidateFullPath } from '@utils';

import { IExistsInstanceProps } from './exists-instance.types';

const onResolve = ({ result }: IDBRequest) => Boolean(result?.createdAt);

export const existsInstance =
  ({ getRecord, rootDirectoryName }: IExistsInstanceProps) =>
  async (fullPath: string): Promise<boolean> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    return getRecord(verifiedFullPath, onResolve);
  };
