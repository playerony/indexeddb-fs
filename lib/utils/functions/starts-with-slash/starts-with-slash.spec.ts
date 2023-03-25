import { startsWithSlash, functionImportTest } from '@utils';

describe('startsWithSlash Function', () => {
  functionImportTest(startsWithSlash);

  it('should return false when fullPath parameter is not a string value', () => {
    // @ts-expect-error
    expect(startsWithSlash({})).toBeFalsy();

    // @ts-expect-error
    expect(startsWithSlash(null)).toBeFalsy();

    // @ts-expect-error
    expect(startsWithSlash(-500)).toBeFalsy();

    // @ts-expect-error
    expect(startsWithSlash(undefined)).toBeFalsy();

    // @ts-expect-error
    expect(startsWithSlash([1, 2, 3])).toBeFalsy();

    // @ts-expect-error
    expect(startsWithSlash(new Date())).toBeFalsy();
  });

  it('should return false when passed value is an empty string', () => {
    expect(startsWithSlash('')).toBeFalsy();
  });

  it('should return false when passed value does not start with slash', () => {
    expect(startsWithSlash('123')).toBeFalsy();
    expect(startsWithSlash('test')).toBeFalsy();
  });

  it('should return true when passed value starts with slash', () => {
    expect(startsWithSlash('/')).toBeTruthy();
    expect(startsWithSlash('/test')).toBeTruthy();
  });
});
