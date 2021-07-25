export const openIndexedDBConnection = (
  databaseName: string,
  databaseVersion?: number,
): IDBOpenDBRequest => indexedDB.open(databaseName, databaseVersion);
