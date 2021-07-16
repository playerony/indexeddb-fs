export const isFunction = (value: any): value is Function =>
  !!(value && value.constructor && value.call && value.apply);
