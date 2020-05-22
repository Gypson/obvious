import React from 'react';
import _pt from 'prop-types';
import uuid from 'uuid/v4';
import proxyComponent from '../../utils/proxyComponent';
import FormField, { partitionFieldProps } from '../FormField';
import RadioButton from '../RadioButton';

const RadioButtonController = ({ value: valueController, onChange, ...props }) => {
  const [id] = React.useState(uuid());
  const [value, setValue] = React.useState(valueController || '');

  React.useEffect(() => {
    setValue(valueController || '');
  }, [valueController]);

  const handleChange = (checked, v, event) => {
    if (v !== value) {
      onChange(value, event);
      setValue(v);
    }
  };

  const renderRadioButton = proxyComponent(RadioButton, ({ value: currentValue, ...props }) => {
    const { inputProps } = partitionFieldProps(props);
    const buttonId = id;
    const buttonValue = value;

    return (
      <RadioButton
        compactSpacing
        {...props}
        {...inputProps}
        id={`${buttonId}-${currentValue}`}
        value={currentValue}
        checked={buttonValue === currentValue}
        onChange={handleChange}
        hideOptionalLabel
      />
    );
  });

  const { children, fieldProps } = partitionFieldProps(props);

  return (
    <FormField {...fieldProps} id={id}>
      {children(renderRadioButton, value, id)}
    </FormField>
  );
};

RadioButtonController.propTypes = {
  children: _pt.func.isRequired,
  name: _pt.string.isRequired,
  onChange: _pt.func.isRequired,
  value: _pt.string,
};

RadioButtonController.defaultProps = {
  value: '',
};

export default RadioButtonController;
