# indexeddb-fs

An **fs** kind of library dedicated to the browser. **indexeddb-fs** is a module that allows you to store data in the browser using an API similar to that of Node's [fs module](http://nodejs.org/api/fs.html). It works based on a browser database called [IndexedDB](http://www.w3.org/TR/IndexedDB/).

[![npm](https://img.shields.io/npm/v/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)
![types](https://img.shields.io/badge/types-typescript%20%7C%20flow-blueviolet)
[![minzip](https://img.shields.io/bundlephobia/minzip/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)
[![Downloads per month](https://img.shields.io/npm/dm/indexeddb-fs.svg)](https://www.npmjs.com/package/indexeddb-fs)

### Motivation

Any other solutions I've found didn't work correctly. Problems I've found was about not enough validation and also directories were not being created.

### Installation

```shell
npm install indexeddb-fs
```

### Super quick start

```js
import fs from 'indexeddb-fs';

await fs.createDirectory('files');
await fs.createDirectory('/files/private');
await fs.createDirectory('root/files/public');

console.log(await fs.isDirectory('root')); // true
console.log(await fs.isDirectory('files')); // true
console.log(await fs.isDirectory('/files/private')); // true

await fs.writeFile('files/public/file.txt', 'content');

console.log(await fs.isFile('files/public/file.txt')); // true
console.log(await fs.isDirectory('files/public/file.txt')); // false

await fs.removeDirectory(fs.rootDirectoryName);
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

### fields

The created object contains all configuration fields you have passed as a configuration. It is also the way you can get access to default values.

```js
import { databaseName, databaseVersion, objectStoreName, rootDirectoryName } from 'indexeddb-fs';
```

### fs.exists(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<boolean>`
- Returns true if the path exists, false otherwise.

### fs.isFile(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<boolean>`
- Returns true if the path contains a file, false otherwise.
- Throws an error when the path does not contain anything.

### fs.isDirectory(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<boolean>`
- Returns true if the path contains a directory, false otherwise.
- Throws an error when the path does not contain anything.

### fs.remove(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<void>`
- Removes files and directories. It does not remove directories recursively!
- Throws an error when the path does not contain anything.

### fs.details(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<FileEntry<any> | DirectoryEntry>`
- Returns an object with details about the file or directory.
- Throws an error when the path does not contain anything.

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

### fs.fileDetails(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<FileEntry<TData>>`
- Returns an object with details about the file.
- Throws an error when the path does not contain anything.
- Throws an error when the destination file is not a file.

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

### fs.writeFile(fullPath, data)

- Parameters: [`fullPath`: string, `data`: TData]
- Returns: `Promise<FileEntry<TData>>`
- Writes `data` to the file, replacing the file if it already exists. `data` can be everything that you want.
- Throws an error when the destination directory of the file does not exist.
- Throws an error when the path contains a directory with the same name.

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

### fs.readFile(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<TData>`
- Reads the entire contents of a file. The returned data type has the same type with which it was saved.
- Throws an error when the destination file does not exist.
- Throws an error when the destination file is not a file.

### fs.removeFile(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<void>`
- Throws an error when the path does not contain anything.
- Throws an error when the destination file is not a file.

### fs.createDirectory(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<DirectoryEntry>`
- Creates a directory at `fullPath` and returns a Promise.
- Throws an error when the destination directory of the directory does not exist.
- Throws an error when the path contains a file with the same name.

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

### fs.directoryDetails(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<DirectoryEntry>`
- Returns an object with details about the directory.
- Throws an error when the path does not contain anything.
- Throws an error when the destination directory is not a directory.

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

### fs.readDirectory(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<ReadDirectoryDecoratorOutput>`
- Reads the entire contents of a directory.
- Throws an error when the destination directory does not exist.
- Throws an error when the destination directory is not a directory.

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

### fs.removeDirectory(fullPath)

- Parameters: [`fullPath`: string]
- Returns: `Promise<void>`
- Removes the directory, recursively removing any files/subdirectories contained within.
- Throws an error when the destination directory does not exist.
- Throws an error when the destination directory is not a directory.

# License

MIT
