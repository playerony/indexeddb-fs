import { createFs } from '@framework/create-fs.function';

import { functionImportTest } from '@utils';

const { createDirectory, details, writeFile } = createFs({
  databaseVersion: 1,
  databaseName: 'details',
  rootDirectoryName: 'root',
  objectStoreName: 'objectStoreName',
});

describe('details Function', () => {
  functionImportTest(details);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(details('wrone name')).rejects.toThrow('"wrone name" path is invalid.');
  });

  it('should throw an error when the file or directory does not exist', async () => {
    await expect(details('file.txt')).rejects.toThrow('"root/file.txt" file or directory does not exist.');

    await expect(details('test/file.txt')).rejects.toThrow('"root/test/file.txt" file or directory does not exist.');
  });

  it('should return details about file', async () => {
    const createdFile = await writeFile('file.txt', 'test 2 content');
    const createdFileDetails = await details(createdFile.fullPath);

    expect(createdFileDetails.type).toEqual('file');
    expect(createdFileDetails.name).toEqual('file.txt');
    expect(createdFileDetails.directory).toEqual('root');
    expect(createdFileDetails.fullPath).toEqual('root/file.txt');
  });

  it('should return details about directory', async () => {
    const createdDirectory = await createDirectory('directory');
    const createdDirectoryDetails = await details(createdDirectory.fullPath);

    expect(createdDirectoryDetails.type).toEqual('directory');
    expect(createdDirectoryDetails.name).toEqual('directory');
    expect(createdDirectoryDetails.directory).toEqual('root');
    expect(createdDirectoryDetails.fullPath).toEqual('root/directory');
  });
});
