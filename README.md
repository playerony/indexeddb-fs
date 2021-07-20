# indexeddb-fs

An **fs** kind of library dedicated to the browser. **indexeddb-fs** is a module that allows you to store data in the browser using an API similar to that of Node's [fs module](http://nodejs.org/api/fs.html). It works based on a browser database called [IndexedDB](http://www.w3.org/TR/IndexedDB/).

## Super quick start

```shell
npm install indexeddb-fs --save-dev
```

```js
import { isFile, writeFile, isDirectory, createDirectory, rootDirectoryName } from 'indexeddb-fs';

await createDirectory('files');
await createDirectory('/files/private');
await createDirectory('root/files/public');

console.log(await isDirectory('root')); // true
console.log(await isDirectory('files')); // true
console.log(await isDirectory('/files/private')); // true

await writeFile('files/public/file.txt', 'content');
console.log(await isFile('files/public/file.txt')); // true
console.log(await isDirectory('files/public/file.txt')); // false

await removeDirectory(rootDirectoryName);
```
