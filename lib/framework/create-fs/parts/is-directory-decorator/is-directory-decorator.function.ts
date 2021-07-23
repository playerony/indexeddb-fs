import { formatAndValidateFullPath } from '@framework/utils';

import { EntryType } from '@types';
import { IsDirectoryDecoratorProps } from './is-directory-decorator.types';

const onResolve = ({ result }: IDBRequest) => Boolean(result?.type === EntryType.DIRECTORY);

export const isDirectoryDecorator =
  ({ exists, getRecord, rootDirectoryName }: IsDirectoryDecoratorProps) =>
  async (fullPath: string): Promise<boolean> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesDirectoryExists = await exists(verifiedFullPath);
    if (!doesDirectoryExists) {
      throw new Error(`"${verifiedFullPath}" directory does not exist.`);
    }

    return getRecord(verifiedFullPath, onResolve);
  };
