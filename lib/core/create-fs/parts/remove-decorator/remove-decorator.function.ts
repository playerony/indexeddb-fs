import { deleteByKeyDecorator } from '@database';
import { formatAndValidateFullPath } from '@core/utils';

import { RemoveDecoratorProps } from './remove-decorator.types';

export const removeDecorator =
  ({ exists, rootDirectoryName, initializeObjectStore }: RemoveDecoratorProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const doesTargetExist = await exists(verifiedFullPath);
    if (!doesTargetExist) {
      throw new Error(`"${verifiedFullPath}" file or directory does not exist.`);
    }

    const deleteByKey = deleteByKeyDecorator({ initializeObjectStore });

    return deleteByKey(verifiedFullPath);
  };
