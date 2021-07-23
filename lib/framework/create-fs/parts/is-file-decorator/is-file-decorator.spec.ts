import { createFs } from '@framework';
import { functionImportTest } from '@utils';

const { isFile, writeFile, createDirectory } = createFs({
  databaseVersion: 1,
  databaseName: 'isFile',
  rootDirectoryName: 'root',
  objectStoreName: 'objectStoreName',
});

describe('isFile Function', () => {
  functionImportTest(isFile);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(isFile('root/test/')).rejects.toThrow('"root/test/" path is invalid.');
  });

  it('should throw an error when the user wants to check a file that does not exist', async () => {
    await expect(isFile('file.txt')).rejects.toThrow('"root/file.txt" file does not exist.');
  });

  it('should pass those scenarios', async () => {
    await createDirectory('files');
    await createDirectory('directories');

    await expect(isFile('files')).resolves.toBeFalsy();
    await expect(isFile('directories')).resolves.toBeFalsy();

    await writeFile('file', 'content');
    await expect(isFile('file')).resolves.toBeTruthy();

    await writeFile('files/file', 'content');
    await expect(isFile('files/file')).resolves.toBeTruthy();
  });
});
