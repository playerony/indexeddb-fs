import {
  existsDecorator,
  isFileDecorator,
  removeDecorator,
  detailsDecorator,
  copyFileDecorator,
  readFileDecorator,
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
import {
  isIndexedDBSupport,
  validateCreateFSProps,
  initializeObjectStoreDecorator,
} from '@core/utils';

import { AnyFunction, CreateFsProps, CreateFsOutput } from './create-fs.types';

import { defaultProps } from './create-fs.defaults';

export function createFs({
  databaseName = defaultProps.databaseName,
  databaseVersion = defaultProps.databaseVersion,
  objectStoreName = defaultProps.objectStoreName,
  rootDirectoryName = defaultProps.rootDirectoryName,
}: CreateFsProps = defaultProps): CreateFsOutput {
  function initialize() {
    checkIndexedDBSupport();
    validateProps();
  }

  function checkIndexedDBSupport() {
    if (!isIndexedDBSupport()) {
      throw new Error('Your browser does not support indexedDB.');
    }
  }

  function validateProps() {
    validateCreateFSProps({
      databaseName,
      objectStoreName,
      databaseVersion,
      rootDirectoryName,
    });
  }

  const initializeObjectStore = initializeObjectStoreDecorator({
    databaseName,
    databaseVersion,
    objectStoreName,
  });

  const exists: (fullPath: string) => Promise<boolean> = existsDecorator({
    rootDirectoryName,
    initializeObjectStore,
  });

  const isFile = isFileDecorator({
    exists,
    rootDirectoryName,
    initializeObjectStore,
  });

  const remove = removeDecorator({
    exists,
    rootDirectoryName,
    initializeObjectStore,
  });

  const fileDetails = fileDetailsDecorator({
    isFile,
    rootDirectoryName,
    initializeObjectStore,
  });

  const readFile = readFileDecorator({
    fileDetails,
  });

  const removeFile = removeFileDecorator({
    isFile,
    rootDirectoryName,
    initializeObjectStore,
  });

  const isDirectory = isDirectoryDecorator({
    exists,
    rootDirectoryName,
    initializeObjectStore,
  });

  const writeFile = writeFileDecorator({
    isDirectory,
    rootDirectoryName,
    initializeObjectStore,
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
    isDirectory,
    rootDirectoryName,
    initializeObjectStore,
  });

  const createDirectory = createDirectoryDecorator({
    isFile,
    isDirectory,
    rootDirectoryName,
    initializeObjectStore,
  });

  const removeDirectory = removeDirectoryDecorator({
    remove,
    isDirectory,
    readDirectory,
    rootDirectoryName,
  });

  const directoryDetails = directoryDetailsDecorator({
    isDirectory,
    rootDirectoryName,
    initializeObjectStore,
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
    fileDetails,
    isDirectory,
    rootDirectoryName,
    initializeObjectStore,
  });

  const renameFile = renameFileDecorator({
    exists,
    isFile,
    removeFile,
    updateFileDetails,
    rootDirectoryName,
  });

  const createRootDirectory = createRootDirectoryDecorator({
    rootDirectoryName,
    initializeObjectStore,
  });

  async function createRootDirectoryIfDoesNotExist(): Promise<void> {
    const hasRootDirectory = await exists(rootDirectoryName);

    if (!hasRootDirectory) {
      await createRootDirectory();
    }
  }

  const withRootDirectoryCheck =
    <TFunction extends AnyFunction>(func: TFunction) =>
    async (...args: Parameters<TFunction>) => {
      await createRootDirectoryIfDoesNotExist();

      return func(...args);
    };

  initialize();

  // TODO rename
  // TODO moveFile
  // TODO appendFile
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
