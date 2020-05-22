import React from "react";
import _pt from "prop-types";
import uuid from "uuid/v4";
import proxyComponent from "../../utils/proxyComponent";
import FormField, { partitionFieldProps } from "../FormField";
import BaseButton from "../Button";
import FormInputButton from "../basic/FormInputButton";
import ButtonGroup from "../ButtonGroup";

const ToggleButtonController = ({
  name,
  value: valueController,
  onChange,
  ...props
}) => {
  const [id] = React.useState(uuid());
  const [value, setValue] = React.useState(valueController || "");

  React.useEffect(() => {
    setValue(valueController || "");
  }, [valueController]);

  const handleClick = event => {
    const { value: newValue } = event.currentTarget;
    if (newValue === value) {
      return;
    }

    onChange(newValue, event);

    setValue(newValue);
  };

  const renderButton = proxyComponent(
    BaseButton,
    ({ children, value: currentValue, ...props }) => {
      const { compact, disabled, invalid } = props;
      const selected = currentValue === value;

      return (
        <FormInputButton
          {...props}
          id={`${id}-${currentValue}`}
          name={name}
          value={currentValue}
          disabled={disabled}
          inverted={!selected}
          invalid={invalid}
          small={compact}
          onClick={handleClick}
        >
          {children}
        </FormInputButton>
      );
    }
  );

  const { children, fieldProps } = partitionFieldProps(props);

  return (
    <FormField {...fieldProps} id={id}>
      {children(renderButton, value)}
    </FormField>
  );
};

ToggleButtonController.propTypes = {
  children: _pt.func.isRequired,
  id: _pt.string,
  name: _pt.string,
  onChange: _pt.func,
  value: _pt.string
};

ToggleButtonController.defaultProps = {
  id: null,
  name: null,
  onChange: null,
  value: ""
};

export { ButtonGroup };
export default ToggleButtonController;
