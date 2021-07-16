export const openIndexedDBConnection = (databaseName: string, version?: number): IDBOpenDBRequest =>
  indexedDB.open(databaseName, version);
