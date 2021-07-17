const stringRegExp = '^[a-zA-Z0-9_.-]*$';

export const createFSPropsSchema = {
  type: 'object',
  id: '/CreateFSPropsSchema',
  properties: {
    databaseName: {
      minLength: 4,
      maxLength: 50,
      type: 'string',
      pattern: stringRegExp,
    },
    objectStoreName: {
      minLength: 1,
      maxLength: 20,
      type: 'string',
      pattern: stringRegExp,
    },
    rootDirectoryName: {
      minLength: 1,
      maxLength: 20,
      type: 'string',
      pattern: stringRegExp,
    },
    databaseVersion: {
      minimum: 1,
      maximum: 100,
      type: 'integer',
    },
  },
  required: ['databaseName', 'databaseVersion', 'objectStoreName', 'rootDirectoryName'],
};
