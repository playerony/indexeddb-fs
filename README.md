# indexeddb-fs

An **fs** library for the browser that lets you store data using an API similar to Node's [fs module](http://nodejs.org/api/fs.html). It's powered by [IndexedDB](http://www.w3.org/TR/IndexedDB/), a browser database.

[![npm](https://img.shields.io/npm/v/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)
![types](https://img.shields.io/badge/types-typescript%20%7C%20flow-blueviolet)
[![minzip](https://img.shields.io/bundlephobia/minzip/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)
[![downloads per month](https://img.shields.io/npm/dm/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)
[![issues](https://img.shields.io/github/issues/playerony/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)
[![license](https://img.shields.io/github/license/playerony/indexeddb-fs)](https://www.npmjs.com/package/indexeddb-fs)

## Motivation

Other solutions I found didn't work well. They lacked validation and didn't create directories properly.

## Installation

```shell
npm install indexeddb-fs
```

## A simple example of how you can use indexeddb-fs

```js
import fs from 'indexeddb-fs';

async function main() {
  // Check if a directory exists
  const directoryExists = await fs.isDirectory('my_directory');

  // Create a new directory if it doesn't exist
  if (!directoryExists) {
    await fs.createDirectory('my_directory');
  }

  // Write data to a file
  const content = 'Hello, world!';
  await fs.writeFile('my_directory/my_file.txt', content);

  // Read data from the file
  const readContent = await fs.readFile('my_directory/my_file.txt');
  console.log(readContent); // "Hello, world!"

  // Remove the directory and all files within it
  await fs.removeDirectory('my_directory');
}

main();
```

## A more complex example that demonstrates the use of all the functions

```js
import fs from 'indexeddb-fs';

async function main() {
  // Create a new directory and subdirectories
  await fs.createDirectory('my_directory');
  await fs.createDirectory('my_directory/subdirectory');
  await fs.createDirectory('my_directory/another_subdirectory');

  // Write some content to a file
  const content = 'Hello, world!';
  await fs.writeFile('my_directory/my_file.txt', content);

  // Check if a file exists and if it's a file
  const fileExists = await fs.exists('my_directory/my_file.txt');
  const isAFile = await fs.isFile('my_directory/my_file.txt');

  console.log('File exists:', fileExists); // true
  console.log('Is a file:', isAFile); // true

  // Copy the file to a new location
  await fs.copyFile('my_directory/my_file.txt', 'my_directory/another_subdirectory/my_file_copy.txt');

  // Rename and move the original file to a new location
  await fs.renameFile('my_directory/my_file.txt', 'my_directory/new_file_name.txt');
  await fs.moveFile('my_directory/new_file_name.txt', 'my_directory/subdirectory/new_location.txt');

  // Read the contents of a directory and count the number of files and subdirectories
  const { filesCount, directoriesCount } = await fs.readDirectory('my_directory');

  console.log('Number of files:', filesCount); // 0
  console.log('Number of subdirectories:', directoriesCount); // 2

  // Remove the directory and all files within it
  await fs.removeDirectory('my_directory');

  // Read the contents of the copied file
  const copiedFileContent = await fs.readFile('my_directory/another_subdirectory/my_file_copy.txt');

  console.log('Copied file content:', copiedFileContent); // "Hello, world!"
}

main();
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

# Api

- All methods in indexeddb-fs return a Promise since IndexedDB is an asynchronous API.
- Each method can reject the returned Promise with an `Error` object when an error occurs.
- It's important to handle errors appropriately in your code to ensure your application is robust and doesn't break unexpectedly.

# Fields

The indexeddb-fs library contains several configuration fields that can be accessed after importing the library. These fields include:

- `databaseName`: the name of the IndexedDB database used by the library.
- `databaseVersion`: the version number of the IndexedDB database used by the library.
- `objectStoreName`: the name of the object store used by the library to store data.
- `rootDirectoryName`: the name of the root directory used by the library.

To access these fields, import them from the `indexeddb-fs` module as shown in the example code above. These fields contain configuration information for the library and can also be used to access default values.

# Common functions

## fs.exists(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<boolean>`
- Description: Returns a promise that resolves to `true` if the file or directory at the given `fullPath` exists, and `false` otherwise.

Example of usage:

```js
// Check if a file exists
const fileExists = await fs.exists('path/to/file.txt');
if (fileExists) {
  console.log('The file exists!');
} else {
  console.log('The file does not exist.');
}

// Check if a directory exists
const dirExists = await fs.exists('path/to/directory');
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
await fs.writeFile('file1.txt', 'test content');
await fs.remove('file1.txt');
await fs.exists('file1.txt').then((result) => {
  console.log(!result);
});

// Remove an empty directory
await fs.createDirectory('directory1');
await fs.remove('directory1');
await fs.exists('directory1').then((result) => {
  console.log(!result);
});

// Attempt to remove a non-empty directory
await fs.createDirectory('directory2');
await fs.writeFile('directory2/file2.txt', 'test content');
await fs.remove('directory2').catch((error) => {
  console.error(error.message);
});
await fs.exists('directory2').then((result) => {
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
const createdDirectory = await fs.createDirectory('directory');
const createdDirectoryDetails = await fs.details(createdDirectory.fullPath);

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

# File functions

## fs.isFile(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<boolean>`
- Description: Returns a promise that resolves to `true` if a file exists at the given `fullPath`, and `false` otherwise. If the path does not contain anything, an error is thrown.

Example of usage:

```js
import fs from 'indexeddb-fs';

// Create directories for testing
await fs.createDirectory('files');
await fs.createDirectory('directories');

// Check if directories are files
await fs.isFile('files').then((result) => {
  console.log(result);
});
await fs.isFile('directories').then((result) => {
  console.log(result);
});

// Create a file and check if it is a file
await fs.writeFile('file', 'content');
await fs.isFile('file').then((result) => {
  console.log(result);
});

// Create a file in the 'files' directory and check if it is a file
await fs.writeFile('files/file', 'content');
await fs.isFile('files/file').then((result) => {
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
import fs from 'indexeddb-fs';

// Create a directory to write the file to
await fs.createDirectory('my_directory');

// Write some data to a file
const fileEntry = await fs.writeFile('my_directory/my_file.txt', 'Hello, world!');

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
import fs from 'indexeddb-fs';

// Get details about a file
const fileEntry = await fs.fileDetails('my_directory/my_file.txt');

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
import fs from 'indexeddb-fs';

// Read the contents of a file
const fileContents = await fs.readFile('my_directory/my_file.txt');

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
import fs from 'indexeddb-fs';

// Remove a file
await fs.removeFile('my_directory/my_file.txt');
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
import fs from 'indexeddb-fs';

// Rename a file
const renamedFile = await fs.renameFile('my_directory/my_file.txt', 'new_file.txt');

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
import fs from 'indexeddb-fs';

// Copy a file
const copiedFile = await fs.copyFile('my_directory/my_file.txt', 'my_directory/copied_file.txt');

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
import fs from 'indexeddb-fs';

// Move a file
const movedFile = await fs.moveFile('my_directory/my_file.txt', 'my_directory/moved_file.txt');

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

# Directory functions

## fs.isDirectory(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<boolean>`
- Description: Returns `true` if the path specified by `fullPath` contains a directory, `false` otherwise.
- Throws an error when the path does not contain anything. This can happen if the `fullPath` parameter is an empty string or `null`.

Example of usage:

```js
import fs from 'indexeddb-fs';

// Check if a path is a directory
const isDirectory = await fs.isDirectory('my_directory');

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
import fs from 'indexeddb-fs';

// Create a new directory
const newDirectory = await fs.createDirectory('my_directory');

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
- Returns: `Promise<ReadDirectoryInstanceOutput>`
- Description: Reads the entire contents of the directory specified by `fullPath` and returns a Promise that resolves to an object containing an array of `DirectoryEntry` and `FileEntry` objects representing the contents of the directory, as well as a count of the number of directories and files in the directory.
- Throws an error when the destination directory does not exist. For example, if the `fullPath` parameter specifies a nested directory structure, the method will throw an error if any of the parent directories do not exist.
- Throws an error when the destination directory is not a directory. For example, if the `fullPath` parameter specifies a file rather than a directory, the method will throw an error.

Example of usage:

```js
import fs from 'indexeddb-fs';

// Read the contents of a directory
const directoryContents = await fs.readDirectory('my_directory');

console.log(directoryContents);
// { files: [...], directories: [...], filesCount: 2, directoriesCount: 1 }
```

Example result for `ReadDirectoryInstanceOutput` type:

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
import fs from 'indexeddb-fs';

// Get details about a directory
const directory = await fs.directoryDetails('my_directory');

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
import fs from 'indexeddb-fs';

// Remove a directory
await fs.removeDirectory('my_directory');
```

# License

This project is licensed under the MIT License - see the LICENSE file for details.
