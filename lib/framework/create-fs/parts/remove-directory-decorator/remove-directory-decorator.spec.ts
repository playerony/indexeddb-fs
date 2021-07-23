import { createFs } from '@framework';
import { functionImportTest } from '@utils';

const { exists, writeFile, readDirectory, removeDirectory, createDirectory } = createFs({
  databaseVersion: 1,
  rootDirectoryName: 'root',
  databaseName: 'removeDirectory',
  objectStoreName: 'objectStoreName',
});

describe('removeDirectory Function', () => {
  functionImportTest(removeDirectory);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(removeDirectory('//path')).rejects.toThrow('"//path" path is invalid.');
  });

  it('should throw an error when passed path does not exist', async () => {
    await expect(removeDirectory('path')).rejects.toThrow('"root/path" directory does not exist.');
  });

  it('should throw an error when passed path is not a directory', async () => {
    await writeFile('file_as_directory', 'content');

    await expect(removeDirectory('file_as_directory')).rejects.toThrow(
      '"file_as_directory" is not a directory.',
    );
  });

  it('should remove files and directories of passed fullPath', async () => {
    await createDirectory('test_directory');
    await writeFile('test_directory/file.txt', 'content');
    await createDirectory('test_directory/foo');
    await createDirectory('test_directory/folder');
    await createDirectory('test_directory/folder/foo');
    await createDirectory('test_directory/folder/foo/foo2');
    await createDirectory('test_directory/folder/foo/foo2/foo5');
    await createDirectory('test_directory/folder/foo/foo2/foo3');
    await createDirectory('test_directory/folder/foo/foo2/file.txt');
    await createDirectory('test_directory/folder/foo/foo2/foo3/foo4');

    await removeDirectory('test_directory/folder/foo/foo2');
    await expect(exists('test_directory/folder/foo/foo2')).resolves.toBeFalsy();

    const { files, directories } = await readDirectory('test_directory');
    expect([...files, ...directories]).toHaveLength(3);

    await removeDirectory('test_directory');
    await expect(exists('test_directory')).resolves.toBeFalsy();
  });
});
