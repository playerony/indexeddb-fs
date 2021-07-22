import { validate } from 'jsonschema';

import { CreateFsProps } from '@core';

import { createFsPropsSchema } from './validate-create-fs-props.schema';

export function validateCreateFSProps(props: Required<CreateFsProps>): boolean {
  const { valid, errors } = validate(props, createFsPropsSchema);

  if (valid) {
    return valid;
  }

  const errorsAsString = JSON.stringify(errors);

  throw new Error(`Props passed to createFS function are invalid:\n${errorsAsString}`);
}
