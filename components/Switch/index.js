import React from 'react';
import uuid from 'uuid/v4';
import BaseSwitch from '../basic/BaseSwitch';
import FormField, { partitionFieldProps } from '../FormField';

const Switch = ({ ...props }) => {
  const [id] = React.useState(uuid());
  const { fieldProps, inputProps } = partitionFieldProps(props);

  return (
    <FormField {...fieldProps} id={id} inline stretchLabel>
      <BaseSwitch value="1" {...inputProps} id={id} />
    </FormField>
  );
};

Switch.defaultProps = {
  checked: false,
};

export default Switch;
