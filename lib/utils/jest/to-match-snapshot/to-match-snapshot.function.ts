import { isFunction } from '@utils';

export function toMatchSnapshot(func: Function): void {
  if (!isFunction(func)) {
    throw new Error('parameter is not a function');
  }

  describe('snapshot test', () => {
    it('should match snapshot', () => {
      expect(func()).toMatchSnapshot();
    });
  });
}
