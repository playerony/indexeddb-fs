import { isString } from '@utils';

export function startsWithSlash(fullPath: string): boolean {
  if (!isString(fullPath) || fullPath.length === 0) {
    return false;
  }

  return fullPath[0] === '/';
}
