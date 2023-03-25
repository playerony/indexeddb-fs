import { createFs } from '@framework/create-fs.function';

import { functionImportTest } from '@utils';

const { copyFile, createDirectory, readFile, removeDirectory, removeFile, writeFile } = createFs({
  databaseVersion: 1,
  databaseName: 'copyFile',
  rootDirectoryName: 'root',
  objectStoreName: 'objectStoreName',
});

describe('copyFile Function', () => {
  functionImportTest(copyFile);

  describe('paths validation', () => {
    it('should throw an error when sourcePath parameter is invalid', async () => {
      await expect(copyFile('source path', 'legit')).rejects.toThrow('"source path" path is invalid.');
    });

    it('should throw an error when destinationPath parameter is invalid', async () => {
      await expect(copyFile('source_path', 'destination path')).rejects.toThrow('"destination path" path is invalid.');
    });
  });

  describe('sourcePath access validation', () => {
    it('should throw an error when does not exist', async () => {
      await expect(copyFile('file.txt', 'test.txt')).rejects.toThrow('"root/file.txt" file does not exist.');
    });

    it('should throw an error when it is not a file', async () => {
      await createDirectory('directory_as_a_file_1');

      await expect(copyFile('directory_as_a_file_1', 'test.txt')).rejects.toThrow(
        '"root/directory_as_a_file_1" source is not a file.',
      );

      await removeDirectory('directory_as_a_file_1');
    });
  });

  describe('destinationPath access validation', () => {
    it('should throw an error when the destination directory does not exist', async () => {
      await writeFile('file.txt', 'file content');

      await expect(copyFile('file.txt', 'test/test.txt')).rejects.toThrow('"root/test" directory does not exist.');

      await removeFile('file.txt');
    });

    it('should throw an error when the destination point is already taken', async () => {
      await writeFile('file.txt', 'content');

      await expect(copyFile('file.txt', 'file.txt')).rejects.toThrow('"root/file.txt" is already taken.');

      await removeFile('file.txt');
    });

    it('should throw an error when the destination directory is file', async () => {
      await writeFile('file2.txt', 'file content');

      await expect(copyFile('file2.txt', 'file2.txt/content')).rejects.toThrow(
        '"root/file2.txt" destination directory does not exist.',
      );

      await removeFile('file2.txt');
    });

    it('should throw an error when the destination path is file', async () => {
      await createDirectory('directory_as_a_file_1');
      await writeFile('file.txt', 'file content');

      await expect(copyFile('file.txt', 'directory_as_a_file_1')).rejects.toThrow(
        '"root/directory_as_a_file_1" is already taken.',
      );

      await removeFile('file.txt');
      await removeDirectory('directory_as_a_file_1');
    });
  });

  it('should copy a file to a brand new destination point', async () => {
    await createDirectory('copied_files');
    await writeFile('root_file.txt', 'root file content');

    await copyFile('root_file.txt', 'copied_files/file.txt');

    await expect(readFile('root_file.txt')).resolves.toEqual('root file content');
    await expect(readFile('copied_files/file.txt')).resolves.toEqual('root file content');
  });
});
