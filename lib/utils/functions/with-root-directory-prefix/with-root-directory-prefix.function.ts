import { startsWithSlash, hasRootDirectoryPrefix } from '@utils';

export function withRootDirectoryPrefix(
  fullPath: string,
  rootDirectoryName: string,
): string | null {
  if (fullPath === '') {
    return rootDirectoryName;
  }

  const isRootPrefix = hasRootDirectoryPrefix(fullPath, rootDirectoryName);

  if (!isRootPrefix) {
    const withFirstSlash = startsWithSlash(fullPath);

    return `${rootDirectoryName}${withFirstSlash ? '' : '/'}${fullPath}`;
  }

  return fullPath;
}
