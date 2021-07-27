import { functionImportTest } from '@utils';
import { hasRootDirectoryPrefix } from './has-root-directory-prefix.function';

describe('hasRootDirectoryPrefix Function', () => {
  functionImportTest(hasRootDirectoryPrefix);

  it('should return false when rootDirectoryName value is not a string', () => {
    // @ts-ignore
    expect(hasRootDirectoryPrefix({})).toBeFalsy();

    // @ts-ignore
    expect(hasRootDirectoryPrefix(null)).toBeFalsy();

    // @ts-ignore
    expect(hasRootDirectoryPrefix(-500)).toBeFalsy();

    // @ts-ignore
    expect(hasRootDirectoryPrefix(undefined)).toBeFalsy();

    // @ts-ignore
    expect(hasRootDirectoryPrefix([1, 2, 3])).toBeFalsy();

    // @ts-ignore
    expect(hasRootDirectoryPrefix(new Date())).toBeFalsy();
  });

  it('should return false when fullPath value is not a string', () => {
    // @ts-ignore
    expect(hasRootDirectoryPrefix('test', {})).toBeFalsy();

    // @ts-ignore
    expect(hasRootDirectoryPrefix('test', null)).toBeFalsy();

    // @ts-ignore
    expect(hasRootDirectoryPrefix('test', -500)).toBeFalsy();

    // @ts-ignore
    expect(hasRootDirectoryPrefix('test', undefined)).toBeFalsy();

    // @ts-ignore
    expect(hasRootDirectoryPrefix('test', [1, 2, 3])).toBeFalsy();

    // @ts-ignore
    expect(hasRootDirectoryPrefix('test', new Date())).toBeFalsy();
  });

  it('should return false when fullPath does not starts with rootDirectoryName value', () => {
    expect(hasRootDirectoryPrefix('/example', '')).toBeFalsy();
    expect(hasRootDirectoryPrefix('full_path/example', '')).toBeFalsy();
    expect(hasRootDirectoryPrefix('full_path/example', 'full')).toBeFalsy();
    expect(hasRootDirectoryPrefix('full_path/example', 'full_pat')).toBeFalsy();
  });

  it('should return true when fullPath starts with rootDirectoryName value', () => {
    expect(hasRootDirectoryPrefix('full_path/example', 'full_path')).toBeTruthy();
  });
});
