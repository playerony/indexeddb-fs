import { IReadFileDecoratorProps } from './read-file-decorator.types';

export const readFileDecorator =
  ({ fileDetails }: IReadFileDecoratorProps) =>
  async <TData = unknown>(fullPath: string): Promise<TData> => {
    const result = await fileDetails(fullPath);

    return result.data as TData;
  };
