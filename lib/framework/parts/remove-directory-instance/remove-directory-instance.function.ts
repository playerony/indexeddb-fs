import { formatAndValidateFullPath, tryCatchWrapper } from '@utils';

import { IRemoveDirectoryInstanceProps } from './remove-directory-instance.types';

export const removeDirectoryInstance = ({
  isDirectory,
  readDirectory,
  remove,
  rootDirectoryName,
}: IRemoveDirectoryInstanceProps) => {
  async function removeNestedDirectory(fullPath: string): Promise<void> {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);

    const { directories, directoriesCount, files, filesCount } = await readDirectory(verifiedFullPath);

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

      await tryCatchWrapper(() => remove(_directory.fullPath));
    }
  }

  return async function removeDirectory(fullPath: string): Promise<void> {
    const targetIsOfTypeDirectory = await isDirectory(fullPath);

    if (!targetIsOfTypeDirectory) {
      throw new Error(`"${fullPath}" is not a directory.`);
    }

    await removeNestedDirectory(fullPath);

    if (fullPath !== rootDirectoryName) {
      await tryCatchWrapper(() => remove(fullPath));
    }
  };
};
