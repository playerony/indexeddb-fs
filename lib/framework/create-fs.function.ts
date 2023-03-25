import { getDatabaseCrud, isIndexedDBSupport } from '@database';

import { validateCreateFsProps } from '@utils';

import { defaultProps } from './create-fs.defaults';
import { AnyFunction, ICreateFsOutput, ICreateFsProps } from './create-fs.types';
import {
  copyFileInstance,
  createDirectoryInstance,
  createRootDirectoryInstance,
  detailsInstance,
  directoryDetailsInstance,
  existsInstance,
  fileDetailsInstance,
  isDirectoryInstance,
  isFileInstance,
  moveFileInstance,
  readDirectoryInstance,
  readFileInstance,
  removeDirectoryInstance,
  removeFileInstance,
  removeInstance,
  renameFileInstance,
  updateFileDetailsInstance,
  writeFileInstance,
} from './parts';

const checkIndexedDBSupport = () => {
  if (!isIndexedDBSupport()) {
    throw new Error('Your browser does not support indexedDB.');
  }
};

export const createFs = ({
  databaseName = defaultProps.databaseName,
  databaseVersion = defaultProps.databaseVersion,
  objectStoreName = defaultProps.objectStoreName,
  rootDirectoryName = defaultProps.rootDirectoryName,
}: ICreateFsProps = defaultProps): ICreateFsOutput => {
  const validateProps = () =>
    validateCreateFsProps({
      databaseName,
      objectStoreName,
      databaseVersion,
      rootDirectoryName,
    });

  const initialize = () => {
    checkIndexedDBSupport();
    validateProps();
  };

  const { deleteRecord, getRecord, openCursor, putRecord } = getDatabaseCrud({
    databaseName,
    databaseVersion,
    objectStoreName,
  });

  const exists: (fullPath: string) => Promise<boolean> = existsInstance({
    getRecord,
    rootDirectoryName,
  });

  const isFile = isFileInstance({
    exists,
    getRecord,
    rootDirectoryName,
  });

  const remove = removeInstance({
    exists,
    deleteRecord,
    rootDirectoryName,
  });

  const fileDetails = fileDetailsInstance({
    isFile,
    getRecord,
    rootDirectoryName,
  });

  const readFile = readFileInstance({
    fileDetails,
  });

  const removeFile = removeFileInstance({
    isFile,
    deleteRecord,
    rootDirectoryName,
  });

  const isDirectory = isDirectoryInstance({
    exists,
    getRecord,
    rootDirectoryName,
  });

  const writeFile = writeFileInstance({
    putRecord,
    isDirectory,
    rootDirectoryName,
  });

  const copyFile = copyFileInstance({
    exists,
    isFile,
    writeFile,
    fileDetails,
    isDirectory,
    rootDirectoryName,
  });

  const readDirectory = readDirectoryInstance({
    openCursor,
    isDirectory,
    rootDirectoryName,
  });

  const createDirectory = createDirectoryInstance({
    isFile,
    putRecord,
    isDirectory,
    rootDirectoryName,
  });

  const removeDirectory = removeDirectoryInstance({
    remove,
    isDirectory,
    readDirectory,
    rootDirectoryName,
  });

  const directoryDetails = directoryDetailsInstance({
    getRecord,
    isDirectory,
    rootDirectoryName,
  });

  const details = detailsInstance({
    isFile,
    exists,
    isDirectory,
    fileDetails,
    directoryDetails,
    rootDirectoryName,
  });

  const updateFileDetails = updateFileDetailsInstance({
    putRecord,
    fileDetails,
    isDirectory,
    rootDirectoryName,
  });

  const moveFile = moveFileInstance({
    exists,
    isFile,
    removeFile,
    isDirectory,
    updateFileDetails,
    rootDirectoryName,
  });

  const renameFile = renameFileInstance({
    exists,
    isFile,
    removeFile,
    updateFileDetails,
    rootDirectoryName,
  });

  const createRootDirectory = createRootDirectoryInstance({
    putRecord,
    rootDirectoryName,
  });

  const createRootDirectoryIfDoesNotExist = async (): Promise<void> => {
    const hasRootDirectory = await exists(rootDirectoryName);

    if (!hasRootDirectory) {
      await createRootDirectory();
    }
  };

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
};
