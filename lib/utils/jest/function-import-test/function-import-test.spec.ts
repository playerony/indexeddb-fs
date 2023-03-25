import { functionImportTest } from '@utils';

describe('functionImportTest Function', () => {
  functionImportTest(jest.fn());

  it('should throw an error when passed parameter is not a function', () => {
    // @ts-expect-error
    expect(() => functionImportTest(null)).toThrow('parameter is not a function');
  });
});
