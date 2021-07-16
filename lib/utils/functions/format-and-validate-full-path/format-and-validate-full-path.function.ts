import { isValidPath } from '@utils';

const startsWithSlash = (fullPath: string) => fullPath[0] === '/';

const hasRootPrefix = (rootDirectoryName: string, fullPath: string): boolean =>
  fullPath.startsWith(rootDirectoryName);

function withRootPrefix(rootDirectoryName: string, fullPath: string) {
  const isRootPrefix = hasRootPrefix(rootDirectoryName, fullPath);

  if (!isRootPrefix) {
    const hasFirstSlash = startsWithSlash(fullPath);

    return `${rootDirectoryName}${hasFirstSlash ? '' : '/'}${fullPath}`;
  }

  return fullPath;
}

export function formatAndValidateFullPath(rootDirectoryName: string, fullPath: string): string {
  if (!fullPath) {
    return rootDirectoryName;
  }

  const fullPathWithPrefix = withRootPrefix(rootDirectoryName, fullPath);

  if (!isValidPath(fullPathWithPrefix)) {
    throw new Error(`"${fullPath}" path is invalid`);
  }

  return fullPathWithPrefix;
}
