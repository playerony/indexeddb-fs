import { functionImportTest } from '@utils';
import { createFs } from './create-fs.function';

describe('createFs Function', () => {
  functionImportTest(createFs);

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
      const { exists, writeFile, createDirectory, removeDirectory, rootDirectoryName } = createFs();

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
      const { writeFile, readDirectory, createDirectory, rootDirectoryName } = createFs();

      await writeFile('/file.txt', 'content');
      await writeFile('root/file1.txt', 'content');
      await createDirectory('example_directory');

      const { isEmpty, filesCount, directoriesCount } = await readDirectory(rootDirectoryName);

      expect(isEmpty).toBeFalsy();
      expect(filesCount).toEqual(2);
      expect(directoriesCount).toEqual(1);
    });
  });

  it('should pass this scenario', async () => {
    const {
      isFile,
      exists,
      writeFile,
      isDirectory,
      readDirectory,
      createDirectory,
      removeDirectory,
      rootDirectoryName,
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
    const { filesCount, directoriesCount } = await readDirectory(rootDirectoryName);

    expect(filesCount).toEqual(0);
    expect(directoriesCount).toEqual(0);
  });
});
