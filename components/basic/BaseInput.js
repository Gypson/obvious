import React from 'react';
import _pt from 'prop-types';
import FormInput from './FormInput';

const BaseInput = ({ onChange, ...props }) => {
  const handleChange = event => {
    onChange(event.currentTarget.value, event);
  };

  return <FormInput {...props} tagName="input" onChange={handleChange} />;
};

BaseInput.propTypes = {
  onChange: _pt.func.isRequired,
};

export default BaseInput;
