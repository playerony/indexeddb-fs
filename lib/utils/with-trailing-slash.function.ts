export const withTrailingSlash = (path: string): string =>
  path[path.length - 1] === '/' ? path : `${path}/`;
