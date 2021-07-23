import { formatAndValidateFullPath } from '@framework/utils';

import { FileEntry } from '@types';
import { FileDetailsDecoratorProps } from './file-details-decorator.types';

const onResolve = ({ result }: IDBRequest) => result;

export const fileDetailsDecorator =
  ({ isFile, getRecord, rootDirectoryName }: FileDetailsDecoratorProps) =>
  async <TData = any>(fullPath: string): Promise<FileEntry<TData>> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeFile = await isFile(verifiedFullPath);
    if (!targetIsOfTypeFile) {
      throw new Error(`"${verifiedFullPath}" is not a file.`);
    }

    return getRecord(verifiedFullPath, onResolve);
  };
