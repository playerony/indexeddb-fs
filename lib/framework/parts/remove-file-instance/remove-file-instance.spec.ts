import { createFs } from '@framework/create-fs.function';

import { functionImportTest } from '@utils';

const { createDirectory, exists, removeFile, writeFile } = createFs({
  databaseVersion: 1,
  rootDirectoryName: 'root',
  databaseName: 'removeFile',
  objectStoreName: 'objectStoreName',
});

describe('removeFile Function', () => {
  functionImportTest(removeFile);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(removeFile('test//test2 ')).rejects.toThrow('"test//test2 " path is invalid.');
  });

  it('should throw an error when the user wants to delete a file that does not exist', async () => {
    await expect(removeFile('file.txt')).rejects.toThrow('"root/file.txt" file does not exist.');
  });

  it('should throw an error when user tries to remove root directory', async () => {
    await expect(removeFile('root')).rejects.toThrow('"root" is not a file.');
  });

  it('should throw type error when selected target is not a file', async () => {
    await createDirectory('directory_as_a_file');
    await expect(exists('directory_as_a_file')).resolves.toBeTruthy();

    await expect(removeFile('directory_as_a_file')).rejects.toThrow('"root/directory_as_a_file" is not a file.');
  });

  it('should remove created file in root directory', async () => {
    await writeFile('file1.txt', 'test content');

    await removeFile('file1.txt');
    await expect(exists('file1.txt')).resolves.toBeFalsy();
  });
});
