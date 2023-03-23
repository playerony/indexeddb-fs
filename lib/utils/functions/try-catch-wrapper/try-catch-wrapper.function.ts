export const tryCatchWrapper = async <TData = unknown>(
  func: () => Promise<TData>,
  onError?: (error: unknown) => void,
): Promise<TData | null> => {
  try {
    return await func();
  } catch (error: unknown) {
    if (onError) {
      onError(error);
    }
  }

  return null;
};
