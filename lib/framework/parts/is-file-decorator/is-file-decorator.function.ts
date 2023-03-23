import { formatAndValidateFullPath } from '@utils';

import { EEntryType } from '@types';
import { IIsFileDecoratorProps } from './is-file-decorator.types';

const onResolve = ({ result }: IDBRequest) => Boolean(result?.type === EEntryType.FILE);

export const isFileDecorator =
  ({ exists, getRecord, rootDirectoryName }: IIsFileDecoratorProps) =>
  async (fullPath: string): Promise<boolean> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesFileExist = await exists(verifiedFullPath);

    if (!doesFileExist) {
      throw new Error(`"${verifiedFullPath}" file does not exist.`);
    }

    return getRecord(verifiedFullPath, onResolve);
  };
