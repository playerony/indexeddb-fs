import {
  deleteRecordInstance,
  getRecordInstance,
  initializeObjectStoreInstance,
  openCursorInstance,
  putRecordInstance,
} from '@database';

import { IGetDatabaseCrudOutput, IGetDatabaseCrudProps } from './get-database-crud.types';

export const getDatabaseCrud = ({
  databaseName,
  databaseVersion,
  objectStoreName,
}: IGetDatabaseCrudProps): IGetDatabaseCrudOutput => {
  const initializeObjectStore = initializeObjectStoreInstance({
    databaseName,
    databaseVersion,
    objectStoreName,
  });

  const getRecord = getRecordInstance({ initializeObjectStore });
  const putRecord = putRecordInstance({ initializeObjectStore });
  const openCursor = openCursorInstance({ initializeObjectStore });
  const deleteRecord = deleteRecordInstance({ initializeObjectStore });

  return { getRecord, putRecord, openCursor, deleteRecord };
};
