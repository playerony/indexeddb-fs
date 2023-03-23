import { validate } from 'jsonschema';

import { ICreateFsProps } from '@framework/create-fs.types';

import { createFsPropsSchema } from './validate-create-fs-props.schema';

export function validateCreateFsProps(props: Required<ICreateFsProps>): boolean {
  const { errors, valid } = validate(props, createFsPropsSchema);

  if (valid) {
    return valid;
  }

  const errorsAsString = JSON.stringify(errors);

  throw new Error(`Props passed to createFS function are invalid:\n${errorsAsString}`);
}
