import { toMatchSnapshot } from '@utils';

describe('toMatchSnapshot Function', () => {
  toMatchSnapshot(jest.fn());

  it('should throw an error when passed parameter is not a function', () => {
    // @ts-expect-error
    expect(() => toMatchSnapshot(null)).toThrow('parameter is not a function');
  });
});
