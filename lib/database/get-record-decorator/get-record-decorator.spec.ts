import { functionImportTest } from '@utils';
import { getDatabaseCrud } from '@database';

const { getRecord, putRecord } = getDatabaseCrud({
  databaseVersion: 1,
  databaseName: 'getRecord',
  objectStoreName: 'objectStoreName',
});

describe('getRecord Function', () => {
  functionImportTest(getRecord);

  it('should return undefined when target does not exist', async () => {
    await expect(getRecord('xD', ({ result }) => result)).resolves.toBeUndefined();
  });

  it('should return added record into the database', async () => {
    await putRecord({ fullPath: 'fullPath', directory: 'directory' });

    await expect(getRecord('fullPath', ({ result }: IDBRequest) => result)).resolves.toEqual({
      fullPath: 'fullPath',
      directory: 'directory',
    });
  });
});
