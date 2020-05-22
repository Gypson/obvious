import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import ButtonOrLink from "../basic/ButtonOrLink";
import Loader from "../Loader";

export const styleSheet = ({ color, font, pattern, ui, unit, transition }) => ({
  button: {
    ...pattern.resetButton,
    ...transition.box,
    fontWeight: font.weights.bold,
    position: "relative",
    color: color.base,
    backgroundColor: color.core.primary[3],
    border: `${ui.borderWidthThick}px solid ${color.core.primary[3]}`,
    borderRadius: ui.borderRadius,
    textAlign: "center",

    "@selectors": {
      // Removes weird bonus padding from button in Firefox
      "::-moz-focus-inner": {
        border: 0,
        padding: 0,
        margin: 0
      },

      // Only show hover states on non-disabled
      ":not([disabled]):hover": {
        backgroundColor: color.core.primary[4],
        borderColor: color.core.primary[4]
      }
    }
  },

  button_block: {
    display: "block",
    width: "100%",
    whiteSpace: "normal",
    overflow: "hidden"
  },

  button_borderless: {
    borderColor: "transparent",

    "@selectors": {
      ":not([disabled]):hover": {
        borderColor: color.accent.bgHover
      }
    }
  },

  button_disabled: {
    ...pattern.disabled
  },

  button_invalid: {},

  button_inverted: {
    color: color.core.primary[3],
    backgroundColor: color.accent.bg,

    "@selectors": {
      ":not([disabled]):hover": {
        color: color.core.primary[4],
        backgroundColor: color.accent.bgHover
      }
    }
  },

  button_loading: {
    cursor: "default"
  },

  button_small: {
    ...pattern.smallButton,
    minWidth: 6 * unit
  },

  button_regular: {
    ...pattern.regularButton,
    minWidth: 8 * unit
  },

  button_large: {
    ...pattern.largeButton,
    minWidth: 9 * unit
  }
});

const Button = ({
  children,
  color,
  inverted,
  disabled,
  loading,
  invalid,
  borderless,
  block,
  large,
  small,
  override,
  ...props
}) => {
  let [styles, cx] = useStyles(styleSheet);
  styles = override ? override : styles;

  return (
    <ButtonOrLink
      aria-busy={loading}
      disabled={disabled}
      loading={loading}
      className={cx(
        styles.button,
        large && styles.button_large,
        small && styles.button_small,
        !large && !small && styles.button_regular,
        block && styles.button_block,
        (disabled || loading) && styles.button_disabled,
        (borderless || inverted) && styles.button_inverted,
        invalid && styles.button_invalid,
        borderless && styles.button_borderless,
        loading && styles.button_loading
      )}
      {...props}
    >
      {loading ? <Loader inline inverted={!inverted} /> : children}
    </ButtonOrLink>
  );
};

Button.propTypes = {
  children: _pt.any,
  color: _pt.oneOf(["default", "primary", "secondary"]),
  inverted: _pt.bool,
  invalid: _pt.bool,
  borderless: _pt.bool,
  block: _pt.bool,
  disabled: _pt.bool,
  large: _pt.bool,
  loading: _pt.bool,
  override: _pt.object,
  small: _pt.bool
};

Button.defaultProps = {
  block: false,
  borderless: false,
  children: null,
  color: "primary",
  disabled: false,
  invalid: false,
  inverted: false,
  large: false,
  loading: false,
  override: null,
  small: false
};

export default Button;
