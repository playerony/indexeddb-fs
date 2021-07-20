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

    const { filesCount, directoriesCount, files, directories } = await readDirectory(
      verifiedFullPath,
    );

    if (filesCount > 0) {
      for (const _file of files) {
        await remove(_file.fullPath);
      }
    }

    if (!directoriesCount) {
      await remove(fullPath);

      return;
    }

    for (const _directory of directories) {
      if (!_directory.isRoot) {
        await removeNestedDirectory(_directory.fullPath);
      }

      try {
        await remove(_directory.fullPath);
        // eslint-disable-next-line no-empty
      } catch {}
    }
  }

  return async function removeDirectory(fullPath: string): Promise<void> {
    const targetIsOfTypeDirectory = await isDirectory(fullPath);
    if (!targetIsOfTypeDirectory) {
      throw new Error(`"${fullPath}" is not a directory.`);
    }

    await removeNestedDirectory(fullPath);

    if (fullPath !== rootDirectoryName) {
      await remove(fullPath);
    }
  };
};
