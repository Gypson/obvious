import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import IconRecord from '../../../../icons/src/interface/IconRecord';
import IconRemove from '../../../../icons/src/interface/IconRemove';
import FormInput from './FormInput';
import buildInputStyles from '../../themes/buildInputStyles';

const styleSheet = ({ ...props }) => {
  const styles = buildInputStyles(props);

  return {
    ...styles,

    radio: {
      padding: 0,
      margin: 0,
      width: 18,
      height: 18,
      display: 'block',
      position: 'relative',
      lineHeight: 0,
      // Add focus styling to the radio icons
      '@selectors': {
        '> input:focus + span': {
          boxShadow: `0 0 3px 3px ${props.color.core.primary[2]}`,
        },
      },
    },

    radio_hideLabel: {
      display: 'block',
      marginTop: 0,
    },

    input: {
      ...styles.input,
      width: 18,
      height: 18,
      padding: 0,
      display: 'inline-block',
      cursor: 'pointer',
      borderRadius: '50%',
      position: 'relative',
      // Bullet
      textAlign: 'center',
      fontSize: 8,
      lineHeight: '16px',
      letterSpacing: 0,
    },

    bullet: {
      position: 'absolute',
      top: 1.5,
      left: 1.5,
    },

    indeterminate: {
      position: 'absolute',
      top: 1,
      left: 0.5,
    },

    children: {
      marginLeft: props.unit,
    },
  };
};

const BaseRadioButton = ({
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
    event.target.focus();
    onChange(event.currentTarget.checked, event.currentTarget.value, event);
  };

  const renderRadioButton = () => (
    <label htmlFor={id} className={cx(styles.radio, hideLabel && styles.radio_hideLabel)}>
      <FormInput
        {...props}
        checked={checked}
        disabled={disabled}
        id={id}
        invalid={invalid}
        onChange={handleChange}
        tagName="input"
        type="radio"
        hidden
        optional
      />

      <span
        className={cx(
          styles.input,
          indeterminate && styles.input_indeterminate,
          checked && styles.input_checked,
          invalid && styles.input_invalid,
          disabled && styles.input_disabled,
        )}
      >
        {checked && (
          <span className={cx(styles.bullet)}>
            <IconRecord decorative size="1.35em" />
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

  if (!button) {
    return renderRadioButton();
  }

  return (
    <label
      htmlFor={id}
      className={cx(
        styles.button,
        indeterminate && styles.input_indeterminate,
        checked && styles.button_checked,
        invalid && styles.button_invalid,
        disabled && styles.button_disabled,
      )}
    >
      {renderRadioButton()}

      <div className={cx(styles.children)}>{children}</div>
    </label>
  );
};

BaseRadioButton.propTypes = {
  button: _pt.bool,
  checked: _pt.bool,
  children: _pt.node,
  disabled: _pt.bool,
  id: _pt.any,
  invalid: _pt.bool,
  hideLabel: _pt.bool,
  onChange: _pt.func.isRequired,
  indeterminate: _pt.bool,
};

BaseRadioButton.defaultProps = {
  button: false,
  checked: false,
  children: null,
  disabled: _pt.bool,
  hideLabel: false,
  id: _pt.any,
  indeterminate: false,
  invalid: _pt.bool,
};

export default BaseRadioButton;
