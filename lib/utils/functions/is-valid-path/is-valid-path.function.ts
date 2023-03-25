import { isString } from '@utils';

import { IS_VALID_PATH_REG_EXP_STRING } from '@constants';

const pathRegExp = new RegExp(IS_VALID_PATH_REG_EXP_STRING);

export function isValidPath(path: string): boolean {
  if (!isString(path)) {
    return false;
  }

  return pathRegExp.test(path);
}
