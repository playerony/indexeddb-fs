import {
  getRecordInstance,
  putRecordInstance,
  openCursorInstance,
  deleteRecordInstance,
  initializeObjectStoreInstance,
} from '@database';

import { IGetDatabaseCrudProps, IGetDatabaseCrudOutput } from './get-database-crud.types';

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
