import { getDatabaseCrud } from '@database';

import { functionImportTest } from '@utils';

const { deleteRecord, getRecord, putRecord } = getDatabaseCrud({
  databaseVersion: 1,
  databaseName: 'deleteRecord',
  objectStoreName: 'objectStoreName',
});

describe('deleteRecord Function', () => {
  functionImportTest(deleteRecord);

  it('should delete record from database', async () => {
    await putRecord({ fullPath: 'fullPath', directory: 'directory' });

    await expect(getRecord('fullPath', ({ result }: IDBRequest) => result)).resolves.toEqual({
      fullPath: 'fullPath',
      directory: 'directory',
    });

    await deleteRecord('fullPath');

    await expect(getRecord('fullPath', ({ result }: IDBRequest) => result)).resolves.toBeUndefined();
  });
});
