import { formatAndValidateFullPath } from '@core/utils';

import { RemoveDirectoryDecoratorProps } from './remove-directory-decorator.types';

export const removeDirectoryDecorator = ({
  remove,
  readDirectory,
  rootDirectoryName,
}: RemoveDirectoryDecoratorProps) => {
  async function removeNestedDirectory(fullPath: string): Promise<void> {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const files = await readDirectory(verifiedFullPath);
    if (!files?.length) {
      await remove(fullPath);

      return;
    }

    for (const _file of files) {
      if (_file.type === 'directory') {
        await removeNestedDirectory(_file.fullPath);

        try {
          await remove(_file.fullPath);
          // eslint-disable-next-line no-empty
        } catch {}
      } else {
        await remove(_file.fullPath);
      }
    }
  }

  return async function removeDirectory(fullPath: string): Promise<void> {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    await removeNestedDirectory(verifiedFullPath);

    await remove(verifiedFullPath);
  };
};
