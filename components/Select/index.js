import React from "react";
import _pt from "prop-types";
import { childrenOfType } from "airbnb-prop-types";
import uuid from "uuid/v4";
import BaseSelect from "../basic/BaseSelect";
import FormField, { partitionFieldProps } from "../FormField";

const Select = ({ ...props }) => {
  const { children, fieldProps, inputProps } = partitionFieldProps(props);
  const [id] = React.useState(uuid());

  return (
    <FormField {...fieldProps} id={id}>
      <BaseSelect {...inputProps} id={id}>
        {children}
      </BaseSelect>
    </FormField>
  );
};

Select.propTypes = {
  placeholder: _pt.string,
  children: childrenOfType("option", "optgroup").isRequired
};

Select.defaultProps = {
  placeholder: ""
};

export default Select;
