import { createFs } from '@core';
import { functionImportTest } from '@utils';

const { writeFile, isDirectory, createDirectory } = createFs({
  databaseVersion: 1,
  rootDirectoryName: 'root',
  databaseName: 'isDirectory',
  objectStoreName: 'objectStoreName',
});

describe('isDirectory Function', () => {
  functionImportTest(isDirectory);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(isDirectory('root/test/')).rejects.toThrow('"root/test/" path is invalid.');
  });

  it('should throw an error when the user wants to check a directory that does not exist', async () => {
    await expect(isDirectory('directory')).rejects.toThrow(
      '"root/directory" directory does not exist.',
    );
  });

  it('should pass those scenarios', async () => {
    await createDirectory('files');
    await createDirectory('directories');

    await expect(isDirectory('files')).resolves.toBeTruthy();
    await expect(isDirectory('directories')).resolves.toBeTruthy();

    await writeFile('file', 'content');
    await expect(isDirectory('file')).resolves.toBeFalsy();

    await writeFile('files/file', 'content');
    await expect(isDirectory('files/file')).resolves.toBeFalsy();
    await expect(isDirectory('files')).resolves.toBeTruthy();
  });
});
