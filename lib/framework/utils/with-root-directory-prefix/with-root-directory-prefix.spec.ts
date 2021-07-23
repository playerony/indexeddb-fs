import { functionImportTest } from '@utils';
import { withRootDirectoryPrefix } from './with-root-directory-prefix.function';

describe('withRootDirectoryPrefix Function', () => {
  functionImportTest(withRootDirectoryPrefix);

  it('should return rootDirectoryName when fullPath is an empty string', () => {
    expect(withRootDirectoryPrefix('', 'root')).toEqual('root');
  });

  it('should return passed fullPath when it contains rootDirectoryName', () => {
    expect(withRootDirectoryPrefix('root/test', 'root')).toEqual('root/test');
  });

  it('should add rootDirectoryName to fullPath when it does not contain it', () => {
    expect(withRootDirectoryPrefix('root/test', 'root')).toEqual('root/test');
    expect(withRootDirectoryPrefix('oot/test', 'root')).toEqual('root/oot/test');
  });

  it('should add rootDirectoryName with slash to fullPath when it does not contain it', () => {
    expect(withRootDirectoryPrefix('test', 'root')).toEqual('root/test');
  });
});
