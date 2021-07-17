import { isFunction } from '@utils';

export function toMatchSnapshot(func: Function): void {
  describe('snapshot test', () => {
    it('should match snapshot', () => {
      if (!isFunction(func)) {
        throw new Error('parameter is not a function');
      }

      expect(func()).toMatchSnapshot();
    });
  });
}
