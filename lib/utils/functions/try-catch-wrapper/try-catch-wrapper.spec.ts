import { tryCatchWrapper, functionImportTest } from '@utils';

const promiseResolveCallback = () =>
  new Promise((resolve) => {
    resolve(5);
  });

const promiseRejectCallback = () =>
  new Promise((_, reject) => {
    reject(new Error('test error'));

    throw new Error('test error');
  });

describe('tryCatchWrapper Function', () => {
  functionImportTest(tryCatchWrapper);

  it('should call onError callback when an error occurs', async () => {
    const onError = jest.fn();

    await tryCatchWrapper(promiseRejectCallback, onError);

    expect(onError).toHaveBeenCalled();
  });

  it('should resolve promise when an error does not occur', async () => {
    await expect(tryCatchWrapper(promiseResolveCallback)).resolves.toEqual(5);
  });
});
