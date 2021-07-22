import { functionImportTest } from '@utils';
import { initializeDatabase } from './initialize-database.function';

describe('initializeDatabase Function', () => {
  functionImportTest(initializeDatabase);

  it('should initialize database', async () => {
    const database = await initializeDatabase({
      databaseVersion: 1,
      databaseName: 'databaseName',
      objectStoreName: 'objectStoreName',
    });

    expect(Object.keys(database)).toHaveLength(8);
    expect(database.version).toEqual(1);
    expect(database.name).toEqual('databaseName');
    expect(database.objectStoreNames).toEqual(['objectStoreName']);
  });
});
