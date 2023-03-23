import { formatAndValidateFullPath } from '@utils';

import { EEntryType } from '@types';
import { IIsDirectoryDecoratorProps } from './is-directory-decorator.types';

const onResolve = ({ result }: IDBRequest) => Boolean(result?.type === EEntryType.DIRECTORY);

export const isDirectoryDecorator =
  ({ exists, getRecord, rootDirectoryName }: IIsDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<boolean> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesDirectoryExists = await exists(verifiedFullPath);

    if (!doesDirectoryExists) {
      throw new Error(`"${verifiedFullPath}" directory does not exist.`);
    }

    return getRecord(verifiedFullPath, onResolve);
  };
