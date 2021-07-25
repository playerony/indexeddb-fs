import { functionImportTest } from '@utils';
import { getDatabaseCrud } from '@database';

const { putRecord, openCursor } = getDatabaseCrud({
  databaseVersion: 1,
  databaseName: 'openCursor',
  objectStoreName: 'objectStoreName',
});

const onResolve = ({ result }: IDBRequest, resolve: (value: any) => void) => resolve(result.value);

describe('openCursor Function', () => {
  functionImportTest(openCursor);

  it('should get record from database by cursor', async () => {
    await putRecord({ fullPath: 'fullPath', directory: 'directory' });

    await expect(openCursor('directory', onResolve)).resolves.toEqual({
      fullPath: 'fullPath',
      directory: 'directory',
    });
  });
});
