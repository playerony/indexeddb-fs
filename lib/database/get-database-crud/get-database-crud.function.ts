import {
  getRecordDecorator,
  putRecordDecorator,
  openCursorDecorator,
  deleteRecordDecorator,
  initializeObjectStoreDecorator,
} from '@database';

import { GetDatabaseCrudProps, GetDatabaseCrudOutput } from './get-database-crud.types';

export const getDatabaseCrud = ({
  databaseName,
  databaseVersion,
  objectStoreName,
}: GetDatabaseCrudProps): GetDatabaseCrudOutput => {
  const initializeObjectStore = initializeObjectStoreDecorator({
    databaseName,
    databaseVersion,
    objectStoreName,
  });

  const getRecord = getRecordDecorator({ initializeObjectStore });
  const putRecord = putRecordDecorator({ initializeObjectStore });
  const openCursor = openCursorDecorator({ initializeObjectStore });
  const deleteRecord = deleteRecordDecorator({ initializeObjectStore });

  return { getRecord, putRecord, openCursor, deleteRecord };
};
