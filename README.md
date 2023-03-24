# indexeddb-fs

An **fs** kind of library dedicated to the browser. **indexeddb-fs** is a module that allows you to store data in the browser using an API similar to that of Node's [fs module](http://nodejs.org/api/fs.html). It works based on a browser database called [IndexedDB](http://www.w3.org/TR/IndexedDB/).

[![npm](https://img.shields.io/npm/v/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)
![types](https://img.shields.io/badge/types-typescript%20%7C%20flow-blueviolet)
[![minzip](https://img.shields.io/bundlephobia/minzip/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)
[![downloads per month](https://img.shields.io/npm/dm/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)
[![issues](https://img.shields.io/github/issues/playerony/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)
[![license](https://img.shields.io/github/license/playerony/indexeddb-fs)](https://www.npmjs.com/package/indexeddb-fs)

## Motivation

Any other solutions I've found didn't work correctly. Problems I've found was about not enough validation and also directories were not being created.

## Installation

```shell
npm install indexeddb-fs
```

## Super quick start

```js
import { isFile, writeFile, readDirectory, createDirectory, removeDirectory, rootDirectoryName } from 'indexeddb-fs';

async function createDirectoriesAndFile() {
  await createDirectory('files');
  await createDirectory('files/private');
  await createDirectory(`${rootDirectoryName}/files/public`);

  await writeFile('files/public/file.txt', 'content');
  await isFile('files/public/file.txt');
}

async function deleteDirectories() {
  await removeDirectory(rootDirectoryName);
}

async function listFilesAndDirectories() {
  const { files, directories } = await readDirectory(rootDirectoryName);
  console.log('Files:', files);
  console.log('Directories:', directories);
}

async function run() {
  try {
    await createDirectoriesAndFile();
    await listFilesAndDirectories();
    await deleteDirectories();
  } catch (error) {
    console.error(error);
  }
}

run();
```

## A bit more complex with copy, move, remove and rename files

```js
import {
  isFile,
  exists,
  copyFile,
  moveFile,
  readFile,
  writeFile,
  removeFile,
  renameFile,
  fileDetails,
  readDirectory,
  createDirectory,
  removeDirectory,
  rootDirectoryName,
} from 'indexeddb-fs';

async function createFile() {
  await createDirectory('files');
  await writeFile('files/myfile.txt', 'Hello, world!');
}

async function readFileContent() {
  const content = await readFile('files/myfile.txt');
  console.log(content);
}

async function copyAndMoveFile() {
  await createDirectory('copied_files');
  await copyFile('files/myfile.txt', 'copied_files/copied_file.txt');
  await moveFile('copied_files/copied_file.txt', 'files/copied_file.txt');
}

async function deleteFile() {
  await removeFile('files/myfile.txt');
}

async function listFilesAndDirectories() {
  const { files, directories } = await readDirectory(rootDirectoryName);
  console.log('Files:', files);
  console.log('Directories:', directories);
}

async function getFileDetails() {
  const details = await fileDetails('files/copied_file.txt');
  console.log('File Details:', details);
}

async function run() {
  try {
    await createFile();
    await readFileContent();
    await copyAndMoveFile();
    await deleteFile();
    await listFilesAndDirectories();
    await getFileDetails();
  } catch (error) {
    console.error(error);
  }
}

run();
```

### Custom fs object

```js
import { createFs } from 'indexeddb-fs';

const fs = createFs({
  databaseVersion: 'indexeddb version (default "1")',
  objectStoreName: 'store name in indexeddb (default "files")',
  rootDirectoryName: 'your root directory name (default "root") ',
  databaseName: 'indexeddb database name (default "indexeddb-fs")',
});
```

# API

- All methods return a Promise. Unfortunately, indexedDB is not a synchronous API :(
- Every function returns an error when an error occurs.
- The Promise will be rejected with an `Error` object.

# FIELDS

The created object contains all configuration fields you have passed as a configuration. It is also the way you can get access to default values.

```js
import { databaseName, databaseVersion, objectStoreName, rootDirectoryName } from 'indexeddb-fs';
```

# COMMON

## fs.exists(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<boolean>`
- Description: Returns a promise that resolves to `true` if the file or directory at the given `fullPath` exists, and `false` otherwise.

Example of usage:

```js
// Check if a file exists
const fileExists = await exists('path/to/file.txt');
if (fileExists) {
  console.log('The file exists!');
} else {
  console.log('The file does not exist.');
}

// Check if a directory exists
const dirExists = await exists('path/to/directory');
if (dirExists) {
  console.log('The directory exists!');
} else {
  console.log('The directory does not exist.');
}
```

## fs.remove(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<void>`
- Description: Removes the file or directory at the given `fullPath`. The method does not remove directories recursively, so it will throw an error if the path is not empty.

Example of usage:

```js
// Remove a file
await writeFile('file1.txt', 'test content');
await remove('file1.txt');
await exists('file1.txt').then((result) => {
  console.log(!result);
});

// Remove an empty directory
await createDirectory('directory1');
await remove('directory1');
await exists('directory1').then((result) => {
  console.log(!result);
});

// Attempt to remove a non-empty directory
await createDirectory('directory2');
await writeFile('directory2/file2.txt', 'test content');
await remove('directory2').catch((error) => {
  console.error(error.message);
});
await exists('directory2').then((result) => {
  console.log(result);
});
```

## fs.details(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<FileEntry<any> | DirectoryEntry>`
- Description: Returns an object containing details about the file or directory at the given `fullPath`. The object contains the following properties:
  - `type`: The type of the entry (file or directory).
  - `name`: The name of the entry.
  - `directory`: The name of the directory that contains the entry.
  - `fullPath`: The full path of the entry, including the directory.
- Throws an error when the path does not contain anything.

Example of usage:

```js
// Get details of a newly created directory
const createdDirectory = await createDirectory('directory');
const createdDirectoryDetails = await details(createdDirectory.fullPath);

console.log('Type:', createdDirectoryDetails.type); // directory
console.log('Name:', createdDirectoryDetails.name); // directory
console.log('Directory:', createdDirectoryDetails.directory); // root
console.log('Full Path:', createdDirectoryDetails.fullPath); // root/directory
```

Example result for `FileEntry<any>` type:

```object
{
    type: 'file',
    name: 'file.txt',
    directory: 'root',
    data: 'test 2 content',
    createdAt: 1626882161631,
    fullPath: 'root/file.txt'
}
```

Example result for `DirectoryEntry` type:

```object
{
    isRoot: false,
    directory: 'root',
    type: 'directory',
    name: 'directory',
    createdAt: 1626882291087,
    fullPath: 'root/directory'
}
```

# FILES

## fs.isFile(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<boolean>`
- Description: Returns a promise that resolves to `true` if a file exists at the given `fullPath`, and `false` otherwise. If the path does not contain anything, an error is thrown.

Example of usage:

```js
import { createDirectory, isFile, writeFile } from 'indexeddb-fs';

// Create directories for testing
await createDirectory('files');
await createDirectory('directories');

// Check if directories are files
await isFile('files').then((result) => {
  console.log(result);
});
await isFile('directories').then((result) => {
  console.log(result);
});

// Create a file and check if it is a file
await writeFile('file', 'content');
await isFile('file').then((result) => {
  console.log(result);
});

// Create a file in the 'files' directory and check if it is a file
await writeFile('files/file', 'content');
await isFile('files/file').then((result) => {
  console.log(result);
});
```

Example result for `FileEntry<TData>` type:

```object
{
    type: 'file',
    name: 'file.txt',
    directory: 'root',
    data: 'test 2 content',
    createdAt: 1626882161631,
    fullPath: 'root/file.txt'
}
```

## fs.writeFile(fullPath, data)

- Parameters: [`fullPath`: string, `data`: TData]
- Returns: `Promise<FileEntry<TData>>`
- Description: Writes `data` to the file specified by `fullPath`, replacing the file if it already exists. The `data` parameter can be any data you want to write to the file, and is usually a string or an object that can be serialized to JSON. The method returns a promise that resolves to a `FileEntry` object representing the file that was written.
- Throws an error when the destination directory of the file does not exist. This can happen if the path to the file contains one or more directories that do not exist yet. You can use the `createDirectory` method to create the missing directories.
- Throws an error when the path contains a directory with the same name as the file. For example, if a directory named "file.txt" exists, you cannot create a file with the same name in the same directory.

Example of usage:

```js
import { createDirectory, writeFile } from 'indexeddb-fs';

// Create a directory to write the file to
await createDirectory('my_directory');

// Write some data to a file
const fileEntry = await writeFile('my_directory/my_file.txt', 'Hello, world!');

console.log(fileEntry); // FileEntry object representing the file that was written
```

Example result for `FileEntry<TData>` type:

```object
{
    type: 'file',
    name: 'file.txt',
    directory: 'root',
    data: 'test 2 content',
    createdAt: 1626882161631,
    fullPath: 'root/file.txt'
}
```

## fs.fileDetails(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<FileEntry<TData>>`
- Description: Returns a promise that resolves to a `FileEntry` object containing details about the file specified by `fullPath`. The `FileEntry` object includes information such as the file's name, size, modification date, and type. If the file does not exist, or if the path contains directories that do not exist, the method will throw an error.
- Throws an error when the path does not contain anything. This can happen if the `fullPath` parameter is an empty string or `null`.
- Throws an error when the destination file is not a file. For example, if the path points to a directory, the method will throw an error.

Example of usage:

```js
import { fileDetails } from 'indexeddb-fs';

// Get details about a file
const fileEntry = await fileDetails('my_directory/my_file.txt');

console.log(fileEntry); // FileEntry object representing the file
```

## fs.readFile(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<TData>`
- Description: Returns a promise that resolves to the contents of the file specified by `fullPath`. The returned data type is the same type with which it was saved. For example, if the file was saved as a string using the `writeFile` method, the returned data type will also be a string. If the file was saved as an object using the `writeFile` method, the returned data type will also be an object.
- Throws an error when the destination file does not exist. This can happen if the file was deleted or if the `fullPath` parameter points to a file that does not exist yet.
- Throws an error when the destination file is not a file. For example, if the path points to a directory, the method will throw an error.

Example of usage:

```js
import { readFile } from 'indexeddb-fs';

// Read the contents of a file
const fileContents = await readFile('my_directory/my_file.txt');

console.log(fileContents); // Contents of the file
```

## fs.removeFile(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<void>`
- Description: Removes the file specified by `fullPath`. The method returns a promise that resolves once the file has been successfully removed.
- Throws an error when the path does not contain anything. This can happen if the `fullPath` parameter is an empty string or `null`.
- Throws an error when the destination file is not a file. For example, if the path points to a directory, the method will throw an error.

Example of usage:

```js
import { removeFile } from 'indexeddb-fs';

// Remove a file
await removeFile('my_directory/my_file.txt');
```

## fs.renameFile(fullPath, newFilename)

- Parameters: [`fullPath`: string, `newFilename`: string]
- Returns: `Promise<FileEntry<TData>>`
- Description: Renames the file specified by `fullPath` to the new filename provided as `newFilename`. The method returns a promise that resolves to a `FileEntry` object representing the renamed file.
- Throws an error when the path does not contain anything. This can happen if the `fullPath` parameter is an empty string or `null`.
- Throws an error when the `fullPath` is not a file. For example, if the path points to a directory, the method will throw an error.
- Throws an error when the `fullPath` with a `newFilename` is already taken. For example, if a file named `newFilename` already exists in the same directory as the original file, the method will throw an error.

Example of usage:

```js
import { renameFile } from 'indexeddb-fs';

// Rename a file
const renamedFile = await renameFile('my_directory/my_file.txt', 'new_file.txt');

console.log(renamedFile); // FileEntry object representing the renamed file
```

Example result for `FileEntry<TData>` type:

```object
{
    type: 'file',
    name: 'file.txt',
    directory: 'root',
    data: 'test 2 content',
    createdAt: 1626882161631,
    fullPath: 'root/file.txt'
}
```

## fs.copyFile(fullPath, destinationPath)

- Parameters: [`fullPath`: string, `destinationPath`: string]
- Returns: `Promise<FileEntry<TData>>`
- Description: Copies the file specified by `fullPath` to the destination path specified by `destinationPath`. The method returns a promise that resolves to a `FileEntry` object representing the copied file at the new `destinationPath`.
- Throws an error when the path does not contain anything. This can happen if the `fullPath` or `destinationPath` parameters are empty strings or `null`.
- Throws an error when the `fullPath` is not a file. For example, if the path points to a directory, the method will throw an error.
- Throws an error when the `destinationPath` is already taken. For example, if a file or directory already exists at the `destinationPath`, the method will throw an error.

Example of usage:

```js
import { copyFile } from 'indexeddb-fs';

// Copy a file
const copiedFile = await copyFile('my_directory/my_file.txt', 'my_directory/copied_file.txt');

console.log(copiedFile); // FileEntry object representing the copied file
```

Example result for `FileEntry<TData>` type:

```object
{
    type: 'file',
    name: 'file.txt',
    directory: 'root',
    data: 'test 2 content',
    createdAt: 1626882161631,
    fullPath: 'root/file.txt'
}
```

## fs.moveFile(fullPath, destinationPath)

- Parameters: [`fullPath`: string, `destinationPath`: string]
- Returns: `Promise<FileEntry<TData>>`
- Description: Moves the file specified by `fullPath` to the destination path specified by `destinationPath`. The method returns a promise that resolves to a `FileEntry` object representing the moved file at the new `destinationPath`.
- Throws an error when the path does not contain anything. This can happen if the `fullPath` or `destinationPath` parameters are empty strings or `null`.
- Throws an error when the `fullPath` is not a file. For example, if the path points to a directory, the method will throw an error.
- Throws an error when the `destinationPath` is already taken. For example, if a file or directory already exists at the `destinationPath`, the method will throw an error.

Example of usage:

```js
import { moveFile } from 'indexeddb-fs';

// Move a file
const movedFile = await moveFile('my_directory/my_file.txt', 'my_directory/moved_file.txt');

console.log(movedFile); // FileEntry object representing the moved file
```

Example result for `FileEntry<TData>` type:

```object
{
    type: 'file',
    name: 'file.txt',
    directory: 'root',
    data: 'test 2 content',
    createdAt: 1626882161631,
    fullPath: 'root/file.txt'
}
```

# DIRECTORY

## fs.isDirectory(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<boolean>`
- Description: Returns `true` if the path specified by `fullPath` contains a directory, `false` otherwise.
- Throws an error when the path does not contain anything. This can happen if the `fullPath` parameter is an empty string or `null`.

Example of usage:

```js
import { isDirectory } from 'indexeddb-fs';

// Check if a path is a directory
const isDirectory = await isDirectory('my_directory');

console.log(isDirectory); // true if 'my_directory' is a directory, false otherwise
```

## fs.createDirectory(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<DirectoryEntry>`
- Description: Creates a new directory at the path specified by `fullPath` and returns a Promise that resolves to a `DirectoryEntry` object representing the new directory.
- Throws an error when the destination directory of the directory does not exist. For example, if the `fullPath` parameter specifies a nested directory structure, the method will throw an error if any of the parent directories do not already exist.
- Throws an error when the path contains a file with the same name. For example, if a file called `'my_directory'` already exists in the specified path, the method will throw an error.

Example of usage:

```js
import { createDirectory } from 'indexeddb-fs';

// Create a new directory
const newDirectory = await createDirectory('my_directory');

console.log(newDirectory); // DirectoryEntry object representing the new directory
```

Example result for `DirectoryEntry` type:

```object
{
    isRoot: false,
    directory: 'root',
    type: 'directory',
    name: 'directory',
    createdAt: 1626882291087,
    fullPath: 'root/directory'
}
```

## fs.readDirectory(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<ReadDirectoryDecoratorOutput>`
- Description: Reads the entire contents of the directory specified by `fullPath` and returns a Promise that resolves to an object containing an array of `DirectoryEntry` and `FileEntry` objects representing the contents of the directory, as well as a count of the number of directories and files in the directory.
- Throws an error when the destination directory does not exist. For example, if the `fullPath` parameter specifies a nested directory structure, the method will throw an error if any of the parent directories do not exist.
- Throws an error when the destination directory is not a directory. For example, if the `fullPath` parameter specifies a file rather than a directory, the method will throw an error.

Example of usage:

```js
import { readDirectory } from 'indexeddb-fs';

// Read the contents of a directory
const directoryContents = await readDirectory('my_directory');

console.log(directoryContents);
// { files: [...], directories: [...], filesCount: 2, directoriesCount: 1 }
```

Example result for `ReadDirectoryDecoratorOutput` type:

```object
{
    files: [],
    filesCount: 0,
    isEmpty: true,
    directories: [],
    directoriesCount: 0,
}
```

## fs.directoryDetails(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<DirectoryEntry>`
- Description: Returns an object with details about the directory specified by `fullPath`. The method returns a Promise that resolves to a `DirectoryEntry` object representing the directory.
- Throws an error when the path does not contain anything. For example, if the `fullPath` parameter is an empty string or undefined, the method will throw an error.
- Throws an error when the destination directory is not a directory. For example, if the `fullPath` parameter specifies a file rather than a directory, the method will throw an error.

Example of usage:

```js
import { directoryDetails } from 'indexeddb-fs';

// Get details about a directory
const directory = await directoryDetails('my_directory');

console.log(directory);
// DirectoryEntry object representing the directory
```

Example result for `DirectoryEntry` type:

```object
{
    isRoot: false,
    directory: 'root',
    type: 'directory',
    name: 'directory',
    createdAt: 1626882291087,
    fullPath: 'root/directory'
}
```

## fs.removeDirectory(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<void>`
- Description: Removes the directory specified by `fullPath`, recursively removing any files/subdirectories contained within. The method returns a Promise that resolves once the directory has been removed.
- Throws an error when the destination directory does not exist. For example, if the `fullPath` parameter specifies a nested directory structure, the method will throw an error if any of the parent directories do not exist.
- Throws an error when the destination directory is not a directory. For example, if the `fullPath` parameter specifies a file rather than a directory, the method will throw an error.

Example of usage:

```js
import { removeDirectory } from 'indexeddb-fs';

// Remove a directory
await removeDirectory('my_directory');
```

# License

This project is licensed under the MIT License - see the LICENSE file for details.
