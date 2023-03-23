import {
  existsDecorator,
  isFileDecorator,
  removeDecorator,
  detailsDecorator,
  copyFileDecorator,
  readFileDecorator,
  moveFileDecorator,
  writeFileDecorator,
  renameFileDecorator,
  removeFileDecorator,
  isDirectoryDecorator,
  fileDetailsDecorator,
  readDirectoryDecorator,
  createDirectoryDecorator,
  removeDirectoryDecorator,
  directoryDetailsDecorator,
  updateFileDetailsDecorator,
  createRootDirectoryDecorator,
} from './parts';
import { validateCreateFsProps } from '@utils';
import { isIndexedDBSupport, getDatabaseCrud } from '@database';

import { AnyFunction, ICreateFsProps, ICreateFsOutput } from './create-fs.types';

import { defaultProps } from './create-fs.defaults';

function checkIndexedDBSupport() {
  if (!isIndexedDBSupport()) {
    throw new Error('Your browser does not support indexedDB.');
  }
}

export function createFs({
  databaseName = defaultProps.databaseName,
  databaseVersion = defaultProps.databaseVersion,
  objectStoreName = defaultProps.objectStoreName,
  rootDirectoryName = defaultProps.rootDirectoryName,
}: ICreateFsProps = defaultProps): ICreateFsOutput {
  function validateProps() {
    validateCreateFsProps({
      databaseName,
      objectStoreName,
      databaseVersion,
      rootDirectoryName,
    });
  }

  function initialize() {
    checkIndexedDBSupport();
    validateProps();
  }

  const { deleteRecord, getRecord, openCursor, putRecord } = getDatabaseCrud({
    databaseName,
    databaseVersion,
    objectStoreName,
  });

  const exists: (fullPath: string) => Promise<boolean> = existsDecorator({
    getRecord,
    rootDirectoryName,
  });

  const isFile = isFileDecorator({
    exists,
    getRecord,
    rootDirectoryName,
  });

  const remove = removeDecorator({
    exists,
    deleteRecord,
    rootDirectoryName,
  });

  const fileDetails = fileDetailsDecorator({
    isFile,
    getRecord,
    rootDirectoryName,
  });

  const readFile = readFileDecorator({
    fileDetails,
  });

  const removeFile = removeFileDecorator({
    isFile,
    deleteRecord,
    rootDirectoryName,
  });

  const isDirectory = isDirectoryDecorator({
    exists,
    getRecord,
    rootDirectoryName,
  });

  const writeFile = writeFileDecorator({
    putRecord,
    isDirectory,
    rootDirectoryName,
  });

  const copyFile = copyFileDecorator({
    exists,
    isFile,
    writeFile,
    fileDetails,
    isDirectory,
    rootDirectoryName,
  });

  const readDirectory = readDirectoryDecorator({
    openCursor,
    isDirectory,
    rootDirectoryName,
  });

  const createDirectory = createDirectoryDecorator({
    isFile,
    putRecord,
    isDirectory,
    rootDirectoryName,
  });

  const removeDirectory = removeDirectoryDecorator({
    remove,
    isDirectory,
    readDirectory,
    rootDirectoryName,
  });

  const directoryDetails = directoryDetailsDecorator({
    getRecord,
    isDirectory,
    rootDirectoryName,
  });

  const details = detailsDecorator({
    isFile,
    exists,
    isDirectory,
    fileDetails,
    directoryDetails,
    rootDirectoryName,
  });

  const updateFileDetails = updateFileDetailsDecorator({
    putRecord,
    fileDetails,
    isDirectory,
    rootDirectoryName,
  });

  const moveFile = moveFileDecorator({
    exists,
    isFile,
    removeFile,
    isDirectory,
    updateFileDetails,
    rootDirectoryName,
  });

  const renameFile = renameFileDecorator({
    exists,
    isFile,
    removeFile,
    updateFileDetails,
    rootDirectoryName,
  });

  const createRootDirectory = createRootDirectoryDecorator({
    putRecord,
    rootDirectoryName,
  });

  async function createRootDirectoryIfDoesNotExist(): Promise<void> {
    const hasRootDirectory = await exists(rootDirectoryName);

    if (!hasRootDirectory) {
      await createRootDirectory();
    }
  }

  const withRootDirectoryCheck =
    <TFunction extends AnyFunction>(callback: TFunction) =>
    async (...args: Parameters<TFunction>) => {
      await createRootDirectoryIfDoesNotExist();

      return callback(...args);
    };

  initialize();

  return {
    databaseName,
    databaseVersion,
    objectStoreName,
    rootDirectoryName,
    exists: withRootDirectoryCheck(exists),
    isFile: withRootDirectoryCheck(isFile),
    remove: withRootDirectoryCheck(remove),
    details: withRootDirectoryCheck(details),
    copyFile: withRootDirectoryCheck(copyFile),
    readFile: withRootDirectoryCheck(readFile),
    moveFile: withRootDirectoryCheck(moveFile),
    writeFile: withRootDirectoryCheck(writeFile),
    renameFile: withRootDirectoryCheck(renameFile),
    removeFile: withRootDirectoryCheck(removeFile),
    fileDetails: withRootDirectoryCheck(fileDetails),
    isDirectory: withRootDirectoryCheck(isDirectory),
    readDirectory: withRootDirectoryCheck(readDirectory),
    createDirectory: withRootDirectoryCheck(createDirectory),
    removeDirectory: withRootDirectoryCheck(removeDirectory),
    directoryDetails: withRootDirectoryCheck(directoryDetails),
  };
}
