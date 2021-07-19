import { formatAndValidateFullPath } from '@core/utils';

import { RemoveDirectoryDecoratorProps } from './remove-directory-decorator.types';

export const removeDirectoryDecorator = ({
  remove,
  isDirectory,
  readDirectory,
  rootDirectoryName,
}: RemoveDirectoryDecoratorProps) => {
  async function removeNestedDirectory(fullPath: string): Promise<void> {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const { files, directories } = await readDirectory(verifiedFullPath);

    if (files.length > 0) {
      for (const _file of files) {
        await remove(_file.fullPath);
      }
    }

    if (!directories?.length) {
      await remove(fullPath);

      return;
    }

    for (const _directory of directories) {
      await removeNestedDirectory(_directory.fullPath);

      try {
        await remove(_directory.fullPath);
        // eslint-disable-next-line no-empty
      } catch {}
    }
  }

  return async function removeDirectory(fullPath: string): Promise<void> {
    if (fullPath === rootDirectoryName) {
      throw new Error(`Root directory: "${fullPath}" cannot be removed.`);
    }

    const targetIsOfTypeDirectory = await isDirectory(fullPath);
    if (!targetIsOfTypeDirectory) {
      throw new Error(`"${fullPath}" is not a directory.`);
    }

    await removeNestedDirectory(fullPath);
    await remove(fullPath);
  };
};
