# indexeddb-fs

An **fs** kind of library dedicated to the browser. **indexeddb-fs** is a module that allows you to store data in the browser using an API similar to that of Node's [fs module](http://nodejs.org/api/fs.html). It works based on a browser database called [IndexedDB](http://www.w3.org/TR/IndexedDB/).

## Motivation

Any other solutions I've found didn't work correctly.

## Super quick start

```shell
npm install indexeddb-fs --save-dev
```

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

await fs.removeDirectory(rootDirectoryName);
```

## API

All methods return a Promise. Unfortunately, indexedDB is not a synchronous API :(
Every function returns an error when an error occurs. The Promise will be rejected with an `Error` object.

### exists(fullPath: string)

Check if the content at `fullPath` exist.

### isFile(fullPath: string)

Check if the content at `fullPath` is a file.

### isDirectory(fullPath: string)

Check if the content at `fullPath` is a directory.

### remove(fullPath: string)

Removes the file or directory with the `fullPath` destination from storage and returns a Promise. It does not remove directories recursively!

### writeFile(fullPath: string, data: TData)

Saves the file `data` within the `fullPath` destination and returns a Promise.

### readFile(fullPath: string)

Retrieves the file content from `fullPath` destination and returns a Promise. The Promise will resolve with the file's content with the same type as it was saved with.

### removeFile(fullPath: string)

Removes the file with the `fullPath` destination from storage and returns a Promise. The Promise will reject when the fullPath doesn't exist or if the destination is not a file.

### createDirectory(fullPath: string)

Creates a directory at `fullPath` and returns a Promise.

### readDirectory(fullPath: string)

Gets the contents of `fullPath` and returns a Promise.

### removeDirectory(fullPath: string)

Removes the directory at `fullPath`, recursively removing any files/subdirectories contained within. Returns a Promise that will resolve when the fullPath is removed.

## License

MIT
