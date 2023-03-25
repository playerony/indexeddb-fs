import { IReadFileInstanceProps } from './read-file-instance.types';

export const readFileInstance =
  ({ fileDetails }: IReadFileInstanceProps) =>
  async <TData = unknown>(fullPath: string): Promise<TData> => {
    const result = await fileDetails(fullPath);

    return result.data as TData;
  };
