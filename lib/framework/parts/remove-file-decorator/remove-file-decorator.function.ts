import { formatAndValidateFullPath } from '@utils';

import { IRemoveFileDecoratorProps } from './remove-file-decorator.types';

export const removeFileDecorator =
  ({ deleteRecord, isFile, rootDirectoryName }: IRemoveFileDecoratorProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeFile = await isFile(verifiedFullPath);

    if (!targetIsOfTypeFile) {
      throw new Error(`"${verifiedFullPath}" is not a file.`);
    }

    return deleteRecord(verifiedFullPath);
  };
