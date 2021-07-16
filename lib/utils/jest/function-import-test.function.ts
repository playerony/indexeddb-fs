import { isFunction } from '@utils';

export function functionImportTest(func: Function): void {
  describe('import test', () => {
    it(`should import ${func.name}`, () => {
      if (!isFunction(func)) {
        throw new Error('parameter is not a function');
      }

      expect(typeof func).toBe('function');
    });
  });
}
