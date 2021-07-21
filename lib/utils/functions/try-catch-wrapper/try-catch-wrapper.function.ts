export const tryCatchWrapper = async <TData = any, TError = any>(
  func: () => Promise<TData>,
  onError?: (error: TError) => void,
): Promise<TData | null> => {
  try {
    return await func();
  } catch (error: any) {
    if (onError) {
      onError(error);
    }
  }

  return null;
};
