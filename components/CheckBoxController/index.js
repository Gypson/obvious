import React from 'react';
import _pt from 'prop-types';
import uuid from 'uuid/v4';
import proxyComponent from '../../utils/proxyComponent';
import FormField, { partitionFieldProps } from '../FormField';
import CheckBox from '../CheckBox';

const CheckBoxController = ({ onChange, value: valueController, ...props }) => {
  const [id] = React.useState(uuid());
  const [values, setValues] = React.useState(new Set(valueController));

  React.useEffect(() => {
    setValues(new Set(valueController));
  }, [valueController]);

  const handleChange = (checked, value, event) => {
    const newValues = new Set(values);
    if (checked) {
      newValues.add(value);
    } else {
      newValues.delete(value);
    }
    setValues(newValues);
    onChange(Array.from(values), event);
  };

  const renderCheckBox = proxyComponent(CheckBox, ({ value: currentValue, ...props }) => {
    const { inputProps } = partitionFieldProps(props);
    const buttonId = id;

    return (
      <CheckBox
        compactSpacing
        {...props}
        {...inputProps}
        id={`${buttonId}-${currentValue}`}
        value={currentValue}
        checked={values.has(currentValue)}
        onChange={handleChange}
        hideOptionalLabel
      />
    );
  });

  const { children, fieldProps } = partitionFieldProps(props);

  return (
    <FormField {...fieldProps} id={id}>
      {children(renderCheckBox, Array.from(values), id)}
    </FormField>
  );
};

CheckBoxController.propTypes = {
  children: _pt.func.isRequired,
  name: _pt.string.isRequired,
  onChange: _pt.func.isRequired,
  value: _pt.arrayOf(_pt.string),
};

CheckBoxController.defaultProps = {
  value: [],
};

export default CheckBoxController;
