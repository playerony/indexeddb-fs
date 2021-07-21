import { tryCatchWrapper, functionImportTest } from '@utils';

describe('tryCatchWrapper Function', () => {
  functionImportTest(tryCatchWrapper);

  it('should call onError callback when an error occurs', async () => {
    const func = () =>
      new Promise((resolve, reject) => {
        reject(new Error('test error'));

        throw new Error('test error');
      });

    const onError = jest.fn();
    await tryCatchWrapper(func, onError);

    expect(onError).toHaveBeenCalled();
  });

  it('should resolve promise', async () => {
    const func = () =>
      new Promise((resolve) => {
        resolve(5);
      });

    await expect(tryCatchWrapper(func)).resolves.toEqual(5);
  });
});
