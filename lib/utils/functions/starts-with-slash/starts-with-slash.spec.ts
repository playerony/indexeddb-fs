import { startsWithSlash, functionImportTest } from '@utils';

describe('startsWithSlash Function', () => {
  functionImportTest(startsWithSlash);

  it('should return false when fullPath parameter is not a string value', () => {
    // @ts-ignore
    expect(startsWithSlash({})).toBeFalsy();

    // @ts-ignore
    expect(startsWithSlash(null)).toBeFalsy();

    // @ts-ignore
    expect(startsWithSlash(-500)).toBeFalsy();

    // @ts-ignore
    expect(startsWithSlash(undefined)).toBeFalsy();

    // @ts-ignore
    expect(startsWithSlash([1, 2, 3])).toBeFalsy();

    // @ts-ignore
    expect(startsWithSlash(new Date())).toBeFalsy();
  });

  it('should return false when passed parameter is an empty string', () => {
    expect(startsWithSlash('')).toBeFalsy();
  });

  it('should return false when passed parameter does not start with slash', () => {
    expect(startsWithSlash('123')).toBeFalsy();
    expect(startsWithSlash('test')).toBeFalsy();
  });

  it('should return true when passed parameter starts with slash', () => {
    expect(startsWithSlash('/')).toBeTruthy();
    expect(startsWithSlash('/test')).toBeTruthy();
  });
});
