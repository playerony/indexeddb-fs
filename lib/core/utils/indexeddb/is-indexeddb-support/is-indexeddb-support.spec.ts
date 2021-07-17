import { functionImportTest } from '@utils';
import { isIndexedDBSupport } from './is-indexeddb-support.function';

describe('isIndexedDBSupport Function', () => {
  functionImportTest(isIndexedDBSupport);

  it('should return true if browser supports indexedDB', () => {
    expect(isIndexedDBSupport()).toBeTruthy();
  });
});
