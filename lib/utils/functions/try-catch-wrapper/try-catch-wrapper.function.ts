export const tryCatchWrapper = async <TData = any>(
  func: () => Promise<TData>,
  onError?: (error: any) => void,
): Promise<TData | null> => {
  try {
    return await func();
  } catch (error) {
    if (onError) {
      onError(error);
    }
  }

  return null;
};
