import { formatAndValidateFullPath } from '@utils';

import { IExistsDecoratorProps } from './exists-decorator.types';

const onResolve = ({ result }: IDBRequest) => Boolean(result?.createdAt);

export const existsDecorator =
  ({ getRecord, rootDirectoryName }: IExistsDecoratorProps) =>
  async (fullPath: string): Promise<boolean> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    return getRecord(verifiedFullPath, onResolve);
  };
