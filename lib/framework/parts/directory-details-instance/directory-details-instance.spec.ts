import { functionImportTest } from '@utils';
import { createFs } from '@framework/create-fs.function';

const { createDirectory, directoryDetails, exists, writeFile } = createFs({
  databaseVersion: 1,
  rootDirectoryName: 'root',
  databaseName: 'directoryDetails',
  objectStoreName: 'objectStoreName',
});

describe('directoryDetails Function', () => {
  functionImportTest(directoryDetails);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(directoryDetails('test//test2 ')).rejects.toThrow('"test//test2 " path is invalid.');
  });

  it('should throw an error when the file does not exist', async () => {
    await expect(directoryDetails('file.txt')).rejects.toThrow('"root/file.txt" directory does not exist.');

    await expect(directoryDetails('test/file.txt')).rejects.toThrow('"root/test/file.txt" directory does not exist.');
  });

  it('should throw type error when selected target is not a directory', async () => {
    await writeFile('file_as_directory', 'content');
    await expect(exists('file_as_directory')).resolves.toBeTruthy();

    await expect(directoryDetails('file_as_directory')).rejects.toThrow('"root/file_as_directory" is not a directory.');
  });

  it('should return details about directory', async () => {
    const createdDirectory = await createDirectory('directory');
    const createdDirectoryDetails = await directoryDetails(createdDirectory.fullPath);

    expect(createdDirectoryDetails.isRoot).toBeFalsy();
    expect(createdDirectoryDetails.directory).toEqual('root');
    expect(createdDirectoryDetails.type).toEqual('directory');
    expect(createdDirectoryDetails.name).toEqual('directory');
    expect(createdDirectoryDetails.fullPath).toEqual('root/directory');
  });
});
