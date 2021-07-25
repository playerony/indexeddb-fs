import { formatAndValidateFullPath } from '@utils';

import { EntryType } from '@types';
import { IsFileDecoratorProps } from './is-file-decorator.types';

const onResolve = ({ result }: IDBRequest) => Boolean(result?.type === EntryType.FILE);

export const isFileDecorator =
  ({ exists, getRecord, rootDirectoryName }: IsFileDecoratorProps) =>
  async (fullPath: string): Promise<boolean> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesFileExist = await exists(verifiedFullPath);
    if (!doesFileExist) {
      throw new Error(`"${verifiedFullPath}" file does not exist.`);
    }

    return getRecord(verifiedFullPath, onResolve);
  };
