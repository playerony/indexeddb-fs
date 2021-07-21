import { createFs } from '@core';
import { functionImportTest } from '@utils';

const { writeFile, createDirectory } = createFs({
  databaseVersion: 1,
  databaseName: 'writeFile',
  rootDirectoryName: 'root',
  objectStoreName: 'objectStoreName',
});

describe('writeFile Function', () => {
  functionImportTest(writeFile);

  it('should throw an error when fullPath parameter is invalid', async () => {
    await expect(writeFile('test//test2 ', 'content')).rejects.toThrow(
      '"test//test2 " path is invalid.',
    );
  });

  it('should throw an error when the user tries to create a root directory as a file', async () => {
    await expect(writeFile('root', 'root')).rejects.toThrow(
      'Root directory: "root" cannot be a file.',
    );
  });

  it('should throw an error when user wants to create a file in a folder that does not exist', async () => {
    await expect(createDirectory('test3/test2/test/file.txt')).rejects.toThrow(
      '"root/test3/test2/test" directory does not exist.',
    );
  });

  it('should create file in root directory', async () => {
    const result = await writeFile('file1.txt', 'test content');

    expect(result.type).toEqual('file');
    expect(result.name).toEqual('file1.txt');
    expect(result.directory).toEqual('root');
    expect(result.data).toEqual('test content');
    expect(result.fullPath).toEqual('root/file1.txt');
  });

  it('should create a file in other existing directory', async () => {
    await createDirectory('test2');
    const result = await writeFile('test2/file.txt', 'content');

    expect(result.type).toEqual('file');
    expect(result.data).toEqual('content');
    expect(result.name).toEqual('file.txt');
    expect(result.directory).toEqual('root/test2');
    expect(result.fullPath).toEqual('root/test2/file.txt');
  });

  it('should create a file with object data', async () => {
    await createDirectory('test2');
    const result = await writeFile('file3.txt', { test: 'object' });

    expect(result.type).toEqual('file');
    expect(result.name).toEqual('file3.txt');
    expect(result.directory).toEqual('root');
    expect(result.data).toEqual({ test: 'object' });
    expect(result.fullPath).toEqual('root/file3.txt');
  });

  it('should throw an error when a user tries to create a file with the same name as the directory', async () => {
    await createDirectory('example_of_directory');
    await expect(writeFile('test2', { test: 'object' })).rejects.toThrow(
      '"root/test2" you cannot create a file with the same name as the directory.',
    );
  });
});
