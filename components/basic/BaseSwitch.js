import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import IconCheck from '../../../../icons/src/interface/IconCheck';
import FormInput from './FormInput';
import buildInputStyles from '../../themes/buildInputStyles';

const styleSheet = ({ ...props }) => {
  const { color, ui, unit } = props;
  const styles = buildInputStyles(props);
  const width = unit * 5;
  const height = unit * 3;

  return {
    ...styles,

    switch: {
      padding: 0,
      margin: 0,
      width,
      height,
      display: 'inline-block',
      position: 'relative',
      overflow: 'hidden',
      lineHeight: 0,
    },

    toggle: {
      position: 'relative',
      display: 'inline-block',
      background: color.accent.bg,
      borderRadius: '50%',
      textAlign: 'center',
      fontSize: 10,
      lineHeight: '22px',
      verticalAlign: 'top',
      left: 0,
      transition: `left ${ui.transitionTime}, transform ${ui.transitionTime}`,
      // Subtract border
      width: height - 4,
      height: height - 4,
    },

    toggle_checked: {
      left: '100%',
      transform: 'translateX(-100%)',
    },

    input: {
      ...styles.input,
      width,
      height,
      padding: 0,
      display: 'inline-block',
      cursor: 'pointer',
      backgroundColor: styles.input.borderColor,
      borderRadius: height,
      position: 'relative',
    },

    input_checked: {
      ...styles.input_checked,
      color: styles.input_checked.borderColor,
    },

    input_invalid: {
      ...styles.input_invalid,
      backgroundColor: styles.input_invalid.borderColor,
    },

    input_disabled: {
      ...styles.input_disabled,
      backgroundColor: styles.input_disabled.borderColor,
    },

    checkmark: {
      position: 'absolute',
      top: 2.5,
      left: 2.5,
    },
  };
};

const BaseSwitch = ({ checked, disabled, id, invalid, onChange, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);

  const handleChange = event => {
    onChange(event.currentTarget.checked, event.currentTarget.value, event);
  };

  return (
    <label htmlFor={id} className={cx(styles.switch)}>
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
          checked && styles.input_checked,
          invalid && styles.input_invalid,
          disabled && styles.input_disabled,
        )}
      >
        <span className={cx(styles.toggle, checked && styles.toggle_checked)}>
          {checked && (
            <span className={cx(styles.checkmark)}>
              <IconCheck decorative size="1.5em" />
            </span>
          )}
        </span>
      </span>
    </label>
  );
};

BaseSwitch.propTypes = {
  checked: _pt.bool,
  id: _pt.string,
  onChange: _pt.func,
  disabled: _pt.bool,
  invalid: _pt.bool,
};

BaseSwitch.defaultProps = {
  checked: false,
  disabled: false,
  id: null,
  invalid: false,
  onChange: null,
};

export default BaseSwitch;
