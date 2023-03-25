import { functionImportTest } from '@utils';
import { createFs } from '@framework/create-fs.function';

const { createDirectory, exists, readFile, writeFile } = createFs({
  databaseVersion: 1,
  databaseName: 'readFile',
  rootDirectoryName: 'root',
  objectStoreName: 'objectStoreName',
});

describe('readFile Function', () => {
  functionImportTest(readFile);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(readFile('test//test2 ')).rejects.toThrow('"test//test2 " path is invalid.');
  });

  it('should throw an error when the file does not exist', async () => {
    await expect(readFile('file.txt')).rejects.toThrow('"root/file.txt" file does not exist.');
    await expect(readFile('test/file.txt')).rejects.toThrow('"root/test/file.txt" file does not exist.');
  });

  it('should throw type error when selected target is not a file', async () => {
    await createDirectory('directory_as_a_file');
    await expect(exists('directory_as_a_file')).resolves.toBeTruthy();

    await expect(readFile('directory_as_a_file')).rejects.toThrow('"root/directory_as_a_file" is not a file.');
  });

  it('should return content of found file', async () => {
    const file = await writeFile('file.txt', 'test 2 content');

    await expect(readFile(file.fullPath)).resolves.toEqual('test 2 content');
  });
});
