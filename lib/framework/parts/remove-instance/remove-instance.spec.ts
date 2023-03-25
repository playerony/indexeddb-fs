import { createFs } from '@framework/create-fs.function';

import { functionImportTest } from '@utils';

const { exists, remove, writeFile } = createFs({
  databaseVersion: 1,
  databaseName: 'remove',
  rootDirectoryName: 'root',
  objectStoreName: 'objectStoreName',
});

describe('remove Function', () => {
  functionImportTest(remove);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(remove('test//test2 ')).rejects.toThrow('"test//test2 " path is invalid.');
  });

  it('should throw an error when the user wants to delete a file that does not exist', async () => {
    await expect(remove('file.txt')).rejects.toThrow('"root/file.txt" file or directory does not exist.');
  });

  it('should remove created file in root directory', async () => {
    await writeFile('file1.txt', 'test content');

    await remove('file1.txt');
    await expect(exists('file1.txt')).resolves.toBeFalsy();
  });
});
