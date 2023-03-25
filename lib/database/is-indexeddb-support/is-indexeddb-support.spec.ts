import { isIndexedDBSupport } from '@database';

import { functionImportTest } from '@utils';

describe('isIndexedDBSupport Function', () => {
  functionImportTest(isIndexedDBSupport);

  it('should return true if browser supports indexedDB', () => {
    expect(isIndexedDBSupport()).toBeTruthy();
  });
});
