import { functionImportTest } from '@utils';
import { formatAndValidateFullPath } from './format-and-validate-full-path.function';

describe('formatAndValidateFullPath Function', () => {
  functionImportTest(formatAndValidateFullPath);

  describe('rootDirectoryName parameter', () => {
    it('should throw an error when it is a falsy value', () => {
      // @ts-ignore
      expect(() => formatAndValidateFullPath('fullPath', null)).toThrow(
        'rootDirectoryName parameter was not provided',
      );
    });

    it('should throw an error when it is an empty string', () => {
      expect(() => formatAndValidateFullPath('fullPath', '')).toThrow(
        'rootDirectoryName parameter was not provided',
      );
    });
  });

  it('should throw an error when fullPath parameter is not a string value', () => {
    // @ts-ignore
    expect(() => formatAndValidateFullPath(null, 'root')).toThrow(
      'fullPath parameter was not provided',
    );
  });

  it('should return fullPath with prefix when validation passed', () => {
    expect(formatAndValidateFullPath('dir1/filename.ext', 'root')).toEqual(
      'root/dir1/filename.ext',
    );

    expect(formatAndValidateFullPath('dir1/dir2/filename.ext', 'root')).toEqual(
      'root/dir1/dir2/filename.ext',
    );
  });

  it('should throw an error when passed fullPath is invalid', () => {
    expect(() => formatAndValidateFullPath('', 'root')).toThrow('"" path is invalid');

    expect(() => formatAndValidateFullPath('//double_slash', 'root')).toThrow(
      '"//double_slash" path is invalid',
    );
  });
});
