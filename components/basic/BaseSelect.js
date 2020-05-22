import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import IconCaretDown from "../../../../icons/src/interface/IconCaretDown";
import FormInput from "./FormInput";

const styleSheet = ({ pattern, unit }) => ({
  select: {
    position: "relative",
    display: "block",
    width: "100%"
  },

  arrow: {
    position: "absolute",
    right: unit,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    zIndex: 1
  },

  arrow_disabled: {
    ...pattern.disabled
  },

  arrow_invalid: {
    ...pattern.invalid
  },

  arrow_compact: {
    right: unit * 0.75
  }
});

const BaseSelect = ({
  children,
  placeholder,
  onChange,
  disabled,
  invalid,
  compact,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);

  const handleChange = event => {
    onChange(event.currentTarget.value, event);
  };

  return (
    <div className={cx(styles.select)}>
      <FormInput
        invalid={invalid}
        {...props}
        onChange={handleChange}
        tagName="select"
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}

        {children}
      </FormInput>

      <span
        className={cx(
          styles.arrow,
          disabled && styles.arrow_disabled,
          invalid && styles.arrow_invalid,
          compact && styles.arrow_compact
        )}
      >
        <IconCaretDown decorative size="2em" />
      </span>
    </div>
  );
};

BaseSelect.propTypes = {
  placeholder: _pt.string,
  onChange: _pt.func,
  disabled: _pt.bool,
  invalid: _pt.bool,
  compact: _pt.bool,
  children: _pt.node.isRequired
};

BaseSelect.defaultProps = {
  compact: false,
  disabled: false,
  invalid: false,
  onChange: null,
  placeholder: ""
};

export default BaseSelect;
