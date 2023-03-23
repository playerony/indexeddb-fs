import { formatAndValidateFullPath } from '@utils';

import { IRemoveDecoratorProps } from './remove-decorator.types';

export const removeDecorator =
  ({ deleteRecord, exists, rootDirectoryName }: IRemoveDecoratorProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesTargetExist = await exists(verifiedFullPath);

    if (!doesTargetExist) {
      throw new Error(`"${verifiedFullPath}" file or directory does not exist.`);
    }

    return deleteRecord(verifiedFullPath);
  };
