import { getDatabaseCrud } from '@database';
import { functionImportTest } from '@utils';
import { createFs } from '@framework/create-fs.function';
import { updateFileDetailsDecorator } from './update-file-details-decorator.function';

const rootDirectoryName = 'root';

const { putRecord } = getDatabaseCrud({
  databaseVersion: 1,
  objectStoreName: 'files',
  databaseName: 'indexeddb-fs',
});

const { isDirectory, fileDetails, writeFile, removeFile, createDirectory, removeDirectory } =
  createFs();

const updateFileDetails = updateFileDetailsDecorator({
  putRecord,
  fileDetails,
  isDirectory,
  rootDirectoryName,
});

describe('updateFileDetails Function', () => {
  functionImportTest(updateFileDetails);

  it('should throw an error when the directory where the file is to be placed does not exist', async () => {
    await writeFile('file.txt', 'content');

    await expect(updateFileDetails('file.txt/test', { name: 'file.txt' })).rejects.toThrow(
      '"root/file.txt" is not a directory.',
    );

    await removeFile('file.txt');
  });

  it('should throw an error when a user tries to edit a root directory', async () => {
    await expect(updateFileDetails(rootDirectoryName, { name: 'file.txt' })).rejects.toThrow(
      'Root directory: "root" cannot be updated.',
    );
  });

  it('should throw an error when a user tries to edit a directory', async () => {
    await createDirectory('files');

    await expect(updateFileDetails('root/files', { name: 'file.txt' })).rejects.toThrow(
      '"root/files" you cannot update a directory.',
    );

    await removeDirectory('files');
  });

  it('should update details about existing file', async () => {
    await createDirectory('files');
    const createdFile = await writeFile('files/file.txt', 'file content');
    expect(createdFile.data).toEqual('file content');

    const updatedFile = await updateFileDetails('files/file.txt', { data: 'update' });
    expect(updatedFile.data).toEqual('update');

    expect(createdFile.type).toEqual(updatedFile.type);
    expect(createdFile.name).toEqual(updatedFile.name);
    expect(createdFile.fullPath).toEqual(updatedFile.fullPath);
    expect(createdFile.createdAt).toEqual(updatedFile.createdAt);
    expect(createdFile.directory).toEqual(updatedFile.directory);
  });
});
