import { isString, functionImportTest } from '@utils';

describe('isString Function', () => {
  functionImportTest(isString);

  it('should return false when provided parameter is not a string value', () => {
    expect(isString({})).toBeFalsy();
    expect(isString(null)).toBeFalsy();
    expect(isString(-500)).toBeFalsy();
    expect(isString(undefined)).toBeFalsy();
    expect(isString([1, 2, 3])).toBeFalsy();
    expect(isString(new Date())).toBeFalsy();
  });

  it('should return true when provided parameter is a string value', () => {
    expect(isString('')).toBeTruthy();
    expect(isString('123')).toBeTruthy();
    expect(isString(String('test'))).toBeTruthy();
  });
});
