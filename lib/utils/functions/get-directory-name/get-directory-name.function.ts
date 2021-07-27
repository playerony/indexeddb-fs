import path from 'path';

export function getDirectoryName(fullPath: string, rootDirectoryName: string): string {
  const directoryName = path.dirname(fullPath);

  if (directoryName === '.') {
    return rootDirectoryName;
  }

  return directoryName;
}
