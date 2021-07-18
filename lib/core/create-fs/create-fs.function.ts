import {
  existsDecorator,
  isFileDecorator,
  removeDecorator,
  readFileDecorator,
  writeFileDecorator,
  removeFileDecorator,
  isDirectoryDecorator,
  readDirectoryDecorator,
  createDirectoryDecorator,
  removeDirectoryDecorator,
} from './parts';
import {
  isIndexedDBSupport,
  validateCreateFSProps,
  initializeObjectStoreDecorator,
} from '@core/utils';

import { CreateFSProps } from './create-fs.types';

import { defaultProps } from './create-fs.defaults';

export function createFS({
  databaseName = defaultProps.databaseName,
  databaseVersion = defaultProps.databaseVersion,
  objectStoreName = defaultProps.objectStoreName,
  rootDirectoryName = defaultProps.rootDirectoryName,
}: CreateFSProps = defaultProps) {
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

  const exists = existsDecorator({ rootDirectoryName, initializeObjectStore });

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

  const readFile = readFileDecorator({
    isFile,
    rootDirectoryName,
    initializeObjectStore,
  });

  const writeFile = writeFileDecorator({
    exists,
    rootDirectoryName,
    initializeObjectStore,
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

  const readDirectory = readDirectoryDecorator({
    isDirectory,
    rootDirectoryName,
    initializeObjectStore,
  });

  const createDirectory = createDirectoryDecorator({
    exists,
    rootDirectoryName,
    initializeObjectStore,
  });

  const removeDirectory = removeDirectoryDecorator({
    remove,
    isDirectory,
    readDirectory,
    rootDirectoryName,
  });

  initialize();

  return {
    exists,
    isFile,
    remove,
    readFile,
    writeFile,
    removeFile,
    isDirectory,
    readDirectory,
    createDirectory,
    removeDirectory,
    databaseName,
    databaseVersion,
    objectStoreName,
    rootDirectoryName,
  };
}
