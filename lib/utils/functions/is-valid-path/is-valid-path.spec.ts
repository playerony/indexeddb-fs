import { isValidPath, functionImportTest } from '@utils';

describe('isValidPath Function', () => {
  functionImportTest(isValidPath);

  it('should return false when passed parameter is not a string value', () => {
    // @ts-ignore
    expect(isValidPath({})).toBeFalsy();

    // @ts-ignore
    expect(isValidPath(null)).toBeFalsy();

    // @ts-ignore
    expect(isValidPath(-500)).toBeFalsy();

    // @ts-ignore
    expect(isValidPath(undefined)).toBeFalsy();

    // @ts-ignore
    expect(isValidPath([1, 2, 3])).toBeFalsy();

    // @ts-ignore
    expect(isValidPath(new Date())).toBeFalsy();
  });

  it('should return false when the provided path is invalid', () => {
    expect(isValidPath('')).toBeFalsy();
    expect(isValidPath('dir1')).toBeFalsy();
    expect(isValidPath('dir1/')).toBeFalsy();
    expect(isValidPath('/dir1')).toBeFalsy();
    expect(isValidPath('bucket.name')).toBeFalsy();
    expect(isValidPath('/bucket.name')).toBeFalsy();
    expect(isValidPath('bucket.name/')).toBeFalsy();
    expect(isValidPath('dir1/dir2/dir3/')).toBeFalsy();
    expect(isValidPath('C:dir1\blah.txt')).toBeFalsy();
    expect(isValidPath('/bucket.name/dir')).toBeFalsy();
    expect(isValidPath('/dir1/dir2/dir3/')).toBeFalsy();
    expect(isValidPath('/dir1/filename.ext')).toBeFalsy();
    expect(isValidPath('bucket.name/dir/filename/')).toBeFalsy();
    expect(isValidPath('/bucket.name/dir/filename/')).toBeFalsy();
    expect(isValidPath('.bucket.name/dir/filename.ext')).toBeFalsy();
    expect(isValidPath('bucket.name./dir/filename.ext')).toBeFalsy();
    expect(isValidPath('bucket..name/dir/filename.ext')).toBeFalsy();
    expect(isValidPath('bucket.name//dir//filename.ext')).toBeFalsy();
    expect(isValidPath('/bucket.name//dir//filename.ext')).toBeFalsy();

    expect(
      isValidPath('bucket.name/dir/filename with spaces!.and_multiple_full_stops.ext'),
    ).toBeFalsy();

    expect(
      isValidPath(
        'bucket.name/dir/filename with all valid path characters, but some that we`re not allowing !£$%^&()-=[]`#`#,.ext',
      ),
    ).toBeFalsy();
  });

  it('should return true when the provided path is valid', () => {
    expect(isValidPath('C:/dir1/blah.txt')).toBeTruthy();
    expect(isValidPath('dir1/filename.ext')).toBeTruthy();
    expect(isValidPath('dir1/dir2/filename.ext')).toBeTruthy();
    expect(isValidPath('bucketname/filename.ext')).toBeTruthy();
    expect(isValidPath('bucket.name/filename.ext')).toBeTruthy();
    expect(isValidPath('bucket.name/dir1/filename.ext')).toBeTruthy();
    expect(isValidPath('bucket.name/dir2/filename.ext')).toBeTruthy();
    expect(isValidPath('valid.bucket.name._-0123456789/filename.ext')).toBeTruthy();
    expect(isValidPath('bucket.name/2015-01-17/15.00_description.ext')).toBeTruthy();
  });
});
