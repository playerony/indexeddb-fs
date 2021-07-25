import { functionImportTest } from '@utils';
import { isIndexedDBSupport } from '@database';

describe('isIndexedDBSupport Function', () => {
  functionImportTest(isIndexedDBSupport);

  it('should return true if browser supports indexedDB', () => {
    expect(isIndexedDBSupport()).toBeTruthy();
  });
});
