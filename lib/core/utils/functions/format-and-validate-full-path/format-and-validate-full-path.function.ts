import { isString } from '@utils';
import { isValidPath, withRootDirectoryPrefix } from '..';

export function formatAndValidateFullPath(fullPath: string, rootDirectoryName: string): string {
  if (!isString(rootDirectoryName) || rootDirectoryName === '') {
    throw new Error('rootDirectoryName parameter was not provided');
  }

  if (!isString(fullPath)) {
    throw new Error('fullPath parameter was not provided');
  }

  const fullPathWithPrefix = withRootDirectoryPrefix(fullPath, rootDirectoryName);

  if (!fullPathWithPrefix || !isValidPath(fullPathWithPrefix)) {
    throw new Error(`"${fullPath}" path is invalid`);
  }

  return fullPathWithPrefix;
}
