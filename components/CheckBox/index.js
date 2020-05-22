import React from 'react';
import _pt from 'prop-types';
import uuid from 'uuid/v4';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import BaseCheckBox from '../basic/BaseCheckBox';
import FormField, { partitionFieldProps } from '../FormField';
import Text from '../Text';

const stateProp = mutuallyExclusiveTrueProps('checked', 'indeterminate');

const CheckBox = ({ checked, indeterminate, id, ...props }) => {
  const [idx] = React.useState(id || uuid());
  const { children, fieldProps, inputProps } = partitionFieldProps(props);
  const { topAlign, ...restProps } = inputProps;
  const { hideLabel } = fieldProps;

  return (
    <FormField
      {...fieldProps}
      id={idx}
      hideLabel={fieldProps.hideLabel || inputProps.button}
      renderFullWidth={inputProps.button}
      topAlign={topAlign}
      inline
      renderBeforeLabel
      renderLargeLabel
      stretchLabel
    >
      <BaseCheckBox {...restProps} id={idx} hideLabel={hideLabel} checked={checked}>
        {children || (
          <>
            <Text bold>{fieldProps.label}</Text>
            {fieldProps.labelDescription && <Text>{fieldProps.labelDescription}</Text>}
          </>
        )}
      </BaseCheckBox>
    </FormField>
  );
};

CheckBox.propTypes = {
  id: _pt.any,
  checked: stateProp,
  indeterminate: stateProp,
  topAlign: _pt.bool,
  value: _pt.string.isRequired,
};

CheckBox.defaultProps = {
  checked: false,
  id: null,
  indeterminate: false,
  topAlign: false,
};

export default CheckBox;
