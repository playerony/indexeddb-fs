import { functionImportTest } from '@utils';
import { openIndexedDBConnection } from './open-indexeddb-connection.function';

describe('openIndexedDBConnection Function', () => {
  functionImportTest(openIndexedDBConnection);

  it('should open indexedDB connection', () => {
    expect(openIndexedDBConnection('databaseName')).toEqual({
      source: null,
      _error: null,
      _result: null,
      listeners: [],
      onerror: null,
      onsuccess: null,
      onblocked: null,
      transaction: null,
      onupgradeneeded: null,
      readyState: 'pending',
    });
  });
});
