import { functionImportTest } from '@utils';

describe('functionImportTest Function', () => {
  functionImportTest(jest.fn());

  it('should throw an error when passed parameter is not a function', () => {
    // @ts-ignore
    expect(() => functionImportTest(null)).toThrow('parameter is not a function');
  });
});
