import { getDirectoryName, functionImportTest } from '@utils';

describe('getDirectoryName Function', () => {
  functionImportTest(getDirectoryName);

  it('should return passed root directory name when value is not in any specified directory', () => {
    expect(getDirectoryName('example', 'root')).toEqual('root');
  });

  it('should return directory where value is existing', () => {
    expect(getDirectoryName('example/directory', 'root')).toEqual('example');
  });
});
