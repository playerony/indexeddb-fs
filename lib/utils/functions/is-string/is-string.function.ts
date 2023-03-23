export const isString = (value: unknown): value is string => typeof value === 'string' || value instanceof String;
