import { functionImportTest } from '@utils';
import { createFs } from '@framework/create-fs.function';

const { createDirectory, exists, fileDetails, writeFile } = createFs({
  databaseVersion: 1,
  rootDirectoryName: 'root',
  databaseName: 'fileDetails',
  objectStoreName: 'objectStoreName',
});

describe('fileDetails Function', () => {
  functionImportTest(fileDetails);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(fileDetails('test//test2 ')).rejects.toThrow('"test//test2 " path is invalid.');
  });

  it('should throw an error when the file does not exist', async () => {
    await expect(fileDetails('file.txt')).rejects.toThrow('"root/file.txt" file does not exist.');
    await expect(fileDetails('test/file.txt')).rejects.toThrow('"root/test/file.txt" file does not exist.');
  });

  it('should throw type error when selected target is not a file', async () => {
    await createDirectory('directory_as_a_file');
    await expect(exists('directory_as_a_file')).resolves.toBeTruthy();

    await expect(fileDetails('directory_as_a_file')).rejects.toThrow('"root/directory_as_a_file" is not a file.');
  });

  it('should return details about file', async () => {
    const createdFile = await writeFile('file.txt', 'test 2 content');
    const createdFileDetails = await fileDetails(createdFile.fullPath);

    expect(createdFileDetails.type).toEqual('file');
    expect(createdFileDetails.name).toEqual('file.txt');
    expect(createdFileDetails.directory).toEqual('root');
    expect(createdFileDetails.data).toEqual('test 2 content');
    expect(createdFileDetails.fullPath).toEqual('root/file.txt');
  });
});
