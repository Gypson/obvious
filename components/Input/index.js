import React from 'react';
import uuid from 'uuid/v4';
import BaseInput from '../basic/BaseInput';
import FormField, { partitionFieldProps } from '../FormField';

/** A controlled input field. */
const Input = ({ ...props }) => {
  const { fieldProps, inputProps } = partitionFieldProps(props);
  const [id] = React.useState(uuid());

  if (inputProps.type === 'hidden') {
    return <BaseInput {...inputProps} id={id} hidden optional />;
  }

  return (
    <FormField {...fieldProps} id={id}>
      <BaseInput {...inputProps} id={id} />
    </FormField>
  );
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
