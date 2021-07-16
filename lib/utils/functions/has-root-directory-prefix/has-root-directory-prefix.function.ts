import { isString } from '@utils';

export function hasRootDirectoryPrefix(fullPath: string, rootDirectoryName: string): boolean {
  if (!isString(fullPath) || !isString(rootDirectoryName) || rootDirectoryName === '') {
    return false;
  }

  const rootDirectoryNameWithSlash = `${rootDirectoryName}/`;

  return fullPath.startsWith(rootDirectoryNameWithSlash);
}
