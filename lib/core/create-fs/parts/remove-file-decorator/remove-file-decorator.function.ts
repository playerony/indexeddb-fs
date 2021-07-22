import { deleteByKeyDecorator } from '@database';
import { formatAndValidateFullPath } from '@core/utils';

import { RemoveFileDecoratorProps } from './remove-file-decorator.types';

export const removeFileDecorator =
  ({ isFile, rootDirectoryName, initializeObjectStore }: RemoveFileDecoratorProps) =>
  async (fullPath: string): Promise<void> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const targetIsOfTypeFile = await isFile(verifiedFullPath);
    if (!targetIsOfTypeFile) {
      throw new Error(`"${verifiedFullPath}" is not a file.`);
    }

    const deleteByKey = deleteByKeyDecorator({ initializeObjectStore });

    return deleteByKey(verifiedFullPath);
  };
