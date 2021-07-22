import { startsWithSlash, hasRootDirectoryPrefix } from '..';

export function withRootDirectoryPrefix(
  fullPath: string,
  rootDirectoryName: string,
): string | null {
  if (fullPath === '') {
    return rootDirectoryName;
  }

  const isRootPrefix = hasRootDirectoryPrefix(fullPath, rootDirectoryName);

  if (!isRootPrefix) {
    const hasFirstSlash = startsWithSlash(fullPath);

    return `${rootDirectoryName}${hasFirstSlash ? '' : '/'}${fullPath}`;
  }

  return fullPath;
}
