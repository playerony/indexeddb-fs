import { validate } from 'jsonschema';

import { CreateFSProps } from '@core';

import { createFSPropsSchema } from './validate-create-fs-props.schema';

export function validateCreateFSProps(props: Required<CreateFSProps>): boolean {
  const { valid, errors } = validate(props, createFSPropsSchema);

  if (valid) {
    return valid;
  }

  const errorsAsString = JSON.stringify(errors);

  throw new Error(`Props passed to createFS function are invalid:\n${errorsAsString}`);
}
