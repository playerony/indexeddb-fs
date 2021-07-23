import { ReadFileDecoratorProps } from './read-file-decorator.types';

export const readFileDecorator =
  ({ fileDetails }: ReadFileDecoratorProps) =>
  async <TData = any>(fullPath: string): Promise<TData> => {
    const result = await fileDetails(fullPath);

    return result.data;
  };
