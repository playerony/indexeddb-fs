import { functionImportTest } from '@utils';
import { getDatabaseCrud } from '@database';

const { getRecord, putRecord } = getDatabaseCrud({
  databaseVersion: 1,
  databaseName: 'putRecord',
  objectStoreName: 'objectStoreName',
});

describe('putRecord Function', () => {
  functionImportTest(putRecord);

  it('should throw an error when the operation does not meet requirements', async () => {
    await expect(putRecord('xD')).rejects.toThrow('Data provided to an operation does not meet requirements.');
  });

  it('should return added record into the database', async () => {
    await putRecord({ fullPath: 'fullPath', directory: 'directory' });

    await expect(getRecord('fullPath', ({ result }: IDBRequest) => result)).resolves.toEqual({
      fullPath: 'fullPath',
      directory: 'directory',
    });
  });
});
