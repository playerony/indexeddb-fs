import { isString } from '@utils';

const pathRegExp = new RegExp('^([A-Za-z]:|[A-Za-z0-9_-]+(.[A-Za-z0-9_-]+)*)((/[A-Za-z0-9_.-]+)+)$');

export function isValidPath(path: string): boolean {
  if (!isString(path)) {
    return false;
  }

  return pathRegExp.test(path);
}
