import path from 'path';

import { putDecorator } from '@database';
import { tryCatchWrapper } from '@utils';
import { formatAndValidateFullPath } from '@core/utils';

import { FileEntry, EntryType } from '@types';
import { WriteFileDecoratorProps } from './write-file-decorator.types';

export const writeFileDecorator =
  ({ isDirectory, rootDirectoryName, initializeObjectStore }: WriteFileDecoratorProps) =>
  async <TData = any>(fullPath: string, data: TData): Promise<FileEntry<TData>> => {
    const verifiedFullPath = formatAndValidateFullPath(fullPath, rootDirectoryName);
    if (verifiedFullPath === rootDirectoryName) {
      throw new Error(`Root directory: "${verifiedFullPath}" cannot be a file.`);
    }

    const basename = path.basename(verifiedFullPath);
    const directory = path.dirname(verifiedFullPath);

    const doesDirectoryExists = await isDirectory(directory);
    if (!doesDirectoryExists) {
      throw new Error(`"${directory}" directory does not exist.`);
    }

    const targetIsTypeOfDirectory = await tryCatchWrapper(
      () => isDirectory(verifiedFullPath),
      () => false,
    );

    if (targetIsTypeOfDirectory) {
      throw new Error(
        `"${verifiedFullPath}" you cannot create a file with the same name as the directory.`,
      );
    }

    const entry: FileEntry<TData> = {
      data,
      directory,
      name: basename,
      type: EntryType.FILE,
      createdAt: Date.now(),
      fullPath: verifiedFullPath,
    };

    const put = putDecorator({ initializeObjectStore });

    return put(entry);
  };
