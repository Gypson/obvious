import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import FormInput from "./FormInput";
import buildInputStyles from "../../themes/buildInputStyles";
import IconCheck from "../../../../icons/src/interface/IconCheck";
import IconRemove from "../../../../icons/src/interface/IconRemove";
import removeFocusOnMouseUp from "../../utils/removeFocusOnMouseUp";

const styleSheet = ({ ...props }) => {
  const styles = buildInputStyles(props);

  return {
    ...styles,

    checkbox: {
      padding: 0,
      margin: 0,
      marginTop: 2,
      width: 18,
      height: 18,
      display: "block",
      lineHeight: 0,
      // Add focus styling to the checkbox icons
      "@selectors": {
        "> input:focus + span": {
          boxShadow: `0 0 3px 3px ${props.color.core.primary[2]}`
        }
      }
    },

    checkbox_hideLabel: {
      display: "block",
      marginTop: 0
    },

    input: {
      ...styles.input,
      width: 18,
      height: 18,
      padding: 0,
      display: "inline-block",
      cursor: "pointer",
      position: "relative",
      // Checkmark
      textAlign: "center",
      fontSize: 10,
      lineHeight: "15px",
      letterSpacing: 0,
      color: props.color.base
    },

    checkmark: {
      position: "absolute",
      top: -1.5,
      left: -1.5
    },

    indeterminate: {
      position: "absolute",
      top: -1,
      left: -1
    },

    children: {
      marginLeft: props.unit
    }
  };
};

const BaseCheckBox = ({
  button,
  checked,
  children,
  disabled,
  hideLabel,
  id,
  invalid,
  indeterminate,
  onChange,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);

  const handleChange = event => {
    removeFocusOnMouseUp(event);
    onChange(event.currentTarget.checked, event.currentTarget.value, event);
  };

  const renderCheckBox = () => {
    return (
      <label
        htmlFor={id}
        className={cx(styles.checkbox, hideLabel && styles.checkbox_hideLabel)}
      >
        <FormInput
          {...props}
          checked={checked}
          disabled={disabled}
          id={id}
          invalid={invalid}
          onChange={handleChange}
          tagName="input"
          type="checkbox"
          hidden
          optional
        />

        <span
          className={cx(
            styles.input,
            indeterminate && styles.input_indeterminate,
            checked && styles.input_checked,
            invalid && styles.input_invalid,
            disabled && styles.input_disabled
          )}
        >
          {checked && (
            <span className={cx(styles.checkmark)}>
              <IconCheck decorative size="1.65em" />
            </span>
          )}

          {indeterminate && (
            <span className={cx(styles.indeterminate)}>
              <IconRemove decorative size="1.65em" />
            </span>
          )}
        </span>
      </label>
    );
  };

  if (!button) {
    return renderCheckBox();
  }

  return (
    <label
      htmlFor={id}
      className={cx(
        styles.button,
        indeterminate && styles.input_indeterminate,
        checked && styles.button_checked,
        invalid && styles.button_invalid,
        disabled && styles.button_disabled
      )}
    >
      {renderCheckBox()}

      <div className={cx(styles.children)}>{children}</div>
    </label>
  );
};

BaseCheckBox.propTypes = {
  button: _pt.bool,
  checked: _pt.bool,
  children: _pt.node,
  disabled: _pt.bool,
  hideLabel: _pt.bool,
  id: _pt.any,
  invalid: _pt.bool,
  indeterminate: _pt.bool,
  onChange: _pt.func.isRequired
};

BaseCheckBox.defaultProps = {
  button: false,
  checked: false,
  children: null,
  disabled: false,
  hideLabel: false,
  id: null,
  indeterminate: false,
  invalid: false
};

export default BaseCheckBox;
