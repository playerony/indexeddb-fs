import { toMatchSnapshot, functionImportTest } from '@utils';

import { createFsPropsSchema } from './validate-create-fs-props.schema';

import { validateCreateFSProps } from './validate-create-fs-props.function';

describe('validateCreateFSProps Function', () => {
  functionImportTest(validateCreateFSProps);
  toMatchSnapshot(() => createFsPropsSchema);

  it('should throw an error when passed value is not an object', () => {
    // @ts-ignore
    expect(() => validateCreateFSProps(null)).toThrowErrorMatchingSnapshot();
  });

  it('should require all object fields', () => {
    // @ts-ignore
    expect(() => validateCreateFSProps({})).toThrowErrorMatchingSnapshot();
  });

  it('should contain proper validators', () => {
    const props = {
      databaseName: 'd',
      databaseVersion: 1.1,
      rootDirectoryName: ' start_with_string',
      objectStoreName: '_contain_string_contain_string_contain_string_contain_string',
    };

    expect(() => validateCreateFSProps(props)).toThrowErrorMatchingSnapshot();
  });
});
