import {
  existsDecorator,
  readFileDecorator,
  writeFileDecorator,
  removeFileDecorator,
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

  const readFile = readFileDecorator({
    rootDirectoryName,
    initializeObjectStore,
  });

  const writeFile = writeFileDecorator({
    exists,
    rootDirectoryName,
    initializeObjectStore,
  });

  const removeFile = removeFileDecorator({
    exists,
    rootDirectoryName,
    initializeObjectStore,
  });

  const readDirectory = readDirectoryDecorator({
    exists,
    rootDirectoryName,
    initializeObjectStore,
  });

  const createDirectory = createDirectoryDecorator({
    exists,
    rootDirectoryName,
    initializeObjectStore,
  });

  const removeDirectory = removeDirectoryDecorator({
    removeFile,
    readDirectory,
    rootDirectoryName,
    initializeObjectStore,
  });

  initialize();

  return {
    exists,
    readFile,
    writeFile,
    removeFile,
    readDirectory,
    createDirectory,
    removeDirectory,
  };
}
