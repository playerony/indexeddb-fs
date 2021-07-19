import { createFs } from '@core';
import { functionImportTest } from '@utils';

const { exists, writeFile, readDirectory, createDirectory } = createFs({
  databaseVersion: 1,
  rootDirectoryName: 'root',
  databaseName: 'databaseName',
  objectStoreName: 'objectStoreName',
});

describe('readDirectory Function', () => {
  functionImportTest(readDirectory);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(readDirectory('//path')).rejects.toThrow('"//path" path is invalid.');
  });

  it('should throw an error when passed path does not exist', async () => {
    await expect(readDirectory('path')).rejects.toThrow('"path" directory does not exist.');
  });

  it('should return empty array when directory is empty', async () => {
    await createDirectory('test_directory');

    await expect(readDirectory('test_directory')).resolves.toEqual({ directories: [], files: [] });
  });

  it('should throw type error when selected target is not a directory', async () => {
    await writeFile('test_file.txt', 'content');
    await expect(exists('test_file.txt')).resolves.toBeTruthy();

    await expect(readDirectory('test_file.txt')).rejects.toThrow(
      '"test_file.txt" is not a directory.',
    );
  });

  it('should return array of found objects', async () => {
    await createDirectory('test_directory');
    await writeFile('test_directory/file.txt', 'content');
    await createDirectory('test_directory/folder');

    const { files, directories } = await readDirectory('test_directory');

    expect(files).toHaveLength(1);
    expect(directories).toHaveLength(1);

    expect(files[0].data).toEqual('content');
    expect(files[0].type).toEqual('file');
    expect(files[0].name).toEqual('file.txt');
    expect(files[0].directory).toEqual('root/test_directory');
    expect(files[0].fullPath).toEqual('root/test_directory/file.txt');

    expect(directories[0].name).toEqual('folder');
    expect(directories[0].type).toEqual('directory');
    expect(directories[0].directory).toEqual('root/test_directory');
    expect(directories[0].fullPath).toEqual('root/test_directory/folder');
  });
});
