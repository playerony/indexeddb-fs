export const openIndexedDBConnection = (databaseName: string, version?: number): IDBOpenDBRequest =>
  window.indexedDB.open(databaseName, version);
