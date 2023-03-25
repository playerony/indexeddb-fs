import { formatAndValidateFullPath } from '@utils';

import { IRemoveInstanceProps } from './remove-instance.types';

export const removeInstance =
  ({ deleteRecord, exists, rootDirectoryName }: IRemoveInstanceProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesTargetExist = await exists(verifiedFullPath);

    if (!doesTargetExist) {
      throw new Error(`"${verifiedFullPath}" file or directory does not exist.`);
    }

    return deleteRecord(verifiedFullPath);
  };
