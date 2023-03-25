import { functionImportTest } from '@utils';

import { createFs } from './create-fs.function';

describe('createFs Function', () => {
  functionImportTest(createFs);

  it('should throw an error when the browser does not support indexedDB', () => {
    const copiedIndexedDB = indexedDB;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    indexedDB = null as any;

    expect(() => createFs()).toThrowErrorMatchingSnapshot();

    // eslint-disable-next-line no-global-assign
    indexedDB = copiedIndexedDB;
  });

  describe('fs object creation', () => {
    it('should throw an error when passed configuration is invalid', () => {
      expect(() =>
        createFs({
          databaseVersion: 1.5,
          rootDirectoryName: '',
          objectStoreName: '  starts with space',
          databaseName: 'too long database name as example of databaseName parameter',
        }),
      ).toThrowErrorMatchingSnapshot();
    });

    it('should return an fs object with the default configuration', () => {
      const { databaseName, databaseVersion, objectStoreName, rootDirectoryName } = createFs();

      expect(databaseVersion).toEqual(1);
      expect(objectStoreName).toEqual('files');
      expect(rootDirectoryName).toEqual('root');
      expect(databaseName).toEqual('indexeddb-fs');
    });
  });

  describe('root directory case', () => {
    it('should create root directory as default', async () => {
      const { isDirectory } = createFs();

      await expect(isDirectory('root')).resolves.toBeTruthy();
    });

    it('user should be able to remove root directory', async () => {
      const { createDirectory, exists, removeDirectory, rootDirectoryName, writeFile } = createFs();

      await createDirectory('files');
      await createDirectory('directories');

      await writeFile('file.txt', 'file');
      await writeFile('files/file.txt', 'file 2');

      await removeDirectory(rootDirectoryName);
      await expect(exists('root')).resolves.toBeTruthy();
      await expect(exists('file.txt')).resolves.toBeFalsy();
      await expect(exists('root/files')).resolves.toBeFalsy();
      await expect(exists('files/file.txt')).resolves.toBeFalsy();
    });

    it('user should be able to read root directory', async () => {
      const { createDirectory, readDirectory, rootDirectoryName, writeFile } = createFs();

      await writeFile('/file.txt', 'content');
      await writeFile('root/file1.txt', 'content');
      await createDirectory('example_directory');

      const { directoriesCount, filesCount, isEmpty } = await readDirectory(rootDirectoryName);

      expect(isEmpty).toBeFalsy();
      expect(filesCount).toEqual(2);
      expect(directoriesCount).toEqual(1);
    });
  });

  it('user should be able to create and remove directory with given name', async () => {
    const {
      createDirectory,
      exists,
      isDirectory,
      isFile,
      readDirectory,
      removeDirectory,
      rootDirectoryName,
      writeFile,
    } = createFs();

    await createDirectory('files');
    await createDirectory('/files/private');
    await createDirectory(`${rootDirectoryName}/files/public`);

    await expect(isDirectory('files')).resolves.toBeTruthy();
    await expect(isDirectory('/files/private')).resolves.toBeTruthy();
    await expect(isDirectory(rootDirectoryName)).resolves.toBeTruthy();
    await expect(isDirectory('root/files/private')).resolves.toBeTruthy();
    await expect(isDirectory(`${rootDirectoryName}/files/private`)).resolves.toBeTruthy();

    await writeFile('files/public/file.txt', 'content');
    await expect(isFile('files/public/file.txt')).resolves.toBeTruthy();
    await expect(exists('files/public/file.txt')).resolves.toBeTruthy();

    await removeDirectory(rootDirectoryName);
    const { directoriesCount, filesCount } = await readDirectory(rootDirectoryName);

    expect(filesCount).toEqual(0);
    expect(directoriesCount).toEqual(0);
  });

  it('user should be able to move, copy and rename files', async () => {
    const {
      copyFile,
      createDirectory,
      exists,
      fileDetails,
      isFile,
      moveFile,
      readDirectory,
      readFile,
      removeDirectory,
      removeFile,
      renameFile,
      rootDirectoryName,
      writeFile,
    } = createFs();

    await createDirectory('files');
    await createDirectory('copied_files');
    await writeFile('files/file.txt', 'content');

    await copyFile('files/file.txt', 'copied_files/copied_file.txt');

    await expect(isFile('files/file.txt')).resolves.toBeTruthy();
    await expect(isFile('copied_files/copied_file.txt')).resolves.toBeTruthy();

    await removeFile('files/file.txt');

    await renameFile('copied_files/copied_file.txt', 'file.txt');
    await expect(exists('copied_files/file.txt')).resolves.toBeTruthy();
    await expect(exists('copied_files/copied_file.txt')).resolves.toBeFalsy();

    await moveFile('copied_files/file.txt', 'files/file.txt');
    await expect(isFile('files/file.txt')).resolves.toBeTruthy();
    await expect(exists('copied_files/file.txt')).resolves.toBeFalsy();

    await moveFile('files/file.txt', 'file.txt');
    await removeDirectory('files');
    await removeDirectory('copied_files');

    const { directoriesCount, filesCount } = await readDirectory(rootDirectoryName);

    expect(filesCount).toEqual(1);
    expect(directoriesCount).toEqual(0);

    const details = await fileDetails('file.txt');

    expect(details.type).toEqual('file');
    expect(details.data).toEqual('content');
    expect(details.name).toEqual('file.txt');
    expect(details.fullPath).toEqual('root/file.txt');
    expect(details.directory).toEqual(rootDirectoryName);

    await expect(readFile('file.txt')).resolves.toEqual('content');
  });
});
