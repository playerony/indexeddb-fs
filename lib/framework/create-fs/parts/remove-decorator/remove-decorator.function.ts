import { formatAndValidateFullPath } from '@framework/utils';

import { RemoveDecoratorProps } from './remove-decorator.types';

export const removeDecorator =
  ({ exists, deleteRecord, rootDirectoryName }: RemoveDecoratorProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesTargetExist = await exists(verifiedFullPath);
    if (!doesTargetExist) {
      throw new Error(`"${verifiedFullPath}" file or directory does not exist.`);
    }

    return deleteRecord(verifiedFullPath);
  };
