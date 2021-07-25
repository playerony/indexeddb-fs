import { getDatabaseCrud } from '@database';
import { functionImportTest } from '@utils';

describe('getDatabaseCrud Function', () => {
  functionImportTest(getDatabaseCrud);

  it('should return proper functions', () => {
    const databaseCrud = getDatabaseCrud({
      databaseVersion: 1,
      databaseName: 'getRecord',
      objectStoreName: 'objectStoreName',
    });

    expect(databaseCrud).toBeDefined();
    expect(Object.keys(databaseCrud)).toEqual([
      'getRecord',
      'putRecord',
      'openCursor',
      'deleteRecord',
    ]);
  });
});
