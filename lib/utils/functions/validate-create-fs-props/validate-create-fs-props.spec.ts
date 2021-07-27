import { toMatchSnapshot, functionImportTest } from '@utils';

import { createFsPropsSchema } from './validate-create-fs-props.schema';

import { validateCreateFsProps } from './validate-create-fs-props.function';

describe('validateCreateFsProps Function', () => {
  functionImportTest(validateCreateFsProps);
  toMatchSnapshot(() => createFsPropsSchema);

  it('should throw an error when passed value is not an object', () => {
    // @ts-ignore
    expect(() => validateCreateFsProps(null)).toThrowErrorMatchingSnapshot();
  });

  it('should require all object fields', () => {
    // @ts-ignore
    expect(() => validateCreateFsProps({})).toThrowErrorMatchingSnapshot();
  });

  it('should validate passed value', () => {
    const props = {
      databaseName: 'd',
      databaseVersion: 1.1,
      rootDirectoryName: ' start_with_string',
      objectStoreName: '_contain_string_contain_string_contain_string_contain_string',
    };

    expect(() => validateCreateFsProps(props)).toThrowErrorMatchingSnapshot();
  });
});
