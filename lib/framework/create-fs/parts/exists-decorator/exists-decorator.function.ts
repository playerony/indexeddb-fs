import { formatAndValidateFullPath } from '@framework/utils';

import { ExistsDecoratorProps } from './exists-decorator.types';

const onResolve = ({ result }: IDBRequest) => Boolean(result?.createdAt);

export const existsDecorator =
  ({ getRecord, rootDirectoryName }: ExistsDecoratorProps) =>
  async (fullPath: string): Promise<boolean> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    return getRecord(verifiedFullPath, onResolve);
  };
