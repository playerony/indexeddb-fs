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
  let hasRootDirectory = false;

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

  const createRootDirectory = createRootDirectoryDecorator({
    rootDirectoryName,
    initializeObjectStore,
  });

  async function createRootDirectoryIfDoesNotExist(): Promise<void> {
    if (!hasRootDirectory) {
      hasRootDirectory = await exists(rootDirectoryName);

      if (!hasRootDirectory) {
        await createRootDirectory(rootDirectoryName);

        hasRootDirectory = true;
      }
    }
  }

  const withRootDirectoryCheck =
    <TFunction extends AnyFunction>(func: TFunction) =>
    async (...args: Parameters<TFunction>) => {
      await createRootDirectoryIfDoesNotExist();

      return func(...args);
    };

  initialize();

  return {
    databaseName,
    databaseVersion,
    objectStoreName,
    rootDirectoryName,
    createRootDirectoryIfDoesNotExist,
    exists: withRootDirectoryCheck(exists),
    isFile: withRootDirectoryCheck(isFile),
    remove: withRootDirectoryCheck(remove),
    readFile: withRootDirectoryCheck(readFile),
    writeFile: withRootDirectoryCheck(writeFile),
    removeFile: withRootDirectoryCheck(removeFile),
    isDirectory: withRootDirectoryCheck(isDirectory),
    readDirectory: withRootDirectoryCheck(readDirectory),
    createDirectory: withRootDirectoryCheck(createDirectory),
    removeDirectory: withRootDirectoryCheck(removeDirectory),
  };
}
