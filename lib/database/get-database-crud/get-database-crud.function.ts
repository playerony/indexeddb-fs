import {
  getRecordDecorator,
  putRecordDecorator,
  openCursorDecorator,
  deleteRecordDecorator,
  initializeObjectStoreDecorator,
} from '@database';

import { IGetDatabaseCrudProps, IGetDatabaseCrudOutput } from './get-database-crud.types';

export const getDatabaseCrud = ({
  databaseName,
  databaseVersion,
  objectStoreName,
}: IGetDatabaseCrudProps): IGetDatabaseCrudOutput => {
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
