import { formatAndValidateFullPath } from '@utils';

import { IRemoveFileInstanceProps } from './remove-file-instance.types';

export const removeFileInstance =
  ({ deleteRecord, isFile, rootDirectoryName }: IRemoveFileInstanceProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeFile = await isFile(verifiedFullPath);

    if (!targetIsOfTypeFile) {
      throw new Error(`"${verifiedFullPath}" is not a file.`);
    }

    return deleteRecord(verifiedFullPath);
  };
