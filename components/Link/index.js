import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import ButtonOrLink from "../basic/ButtonOrLink";
import Text from "../Text";

export const styleSheet = ({ color, pattern, transition }) => ({
  link: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.primary[3],
    textAlign: "left",
    verticalAlign: "baseline",

    ":active": {
      outline: "none"
    },

    ":hover": {
      color: color.core.primary[4],
      textDecoration: "underline"
    }
  },

  link_block: {
    display: "block",
    width: "100%"
  },

  link_baseline: {
    display: "inline"
  },

  link_inverted: {
    color: color.accent.bg,

    ":hover": {
      color: color.accent.bgHover
    }
  },

  link_muted: {
    color: color.core.neutral[3],

    ":hover": {
      color: color.core.neutral[4]
    }
  },

  link_disabled: {
    ...pattern.disabled,

    ":hover": {
      textDecoration: "none"
    }
  }
});

const Link = ({
  block,
  baseline,
  children,
  disabled,
  inverted,
  large,
  muted,
  small,
  bold,
  override,
  ...props
}) => {
  let [styles, cx] = useStyles(styleSheet);
  styles = override ? override : styles;

  return (
    <Text
      inline={!block}
      baseline={baseline}
      small={small}
      large={large}
      bold={bold}
    >
      <ButtonOrLink
        {...props}
        disabled={disabled}
        className={cx(
          styles.link,
          inverted && styles.link_inverted,
          muted && styles.link_muted,
          disabled && styles.link_disabled,
          block && styles.link_block,
          baseline && styles.link_baseline
        )}
      >
        {children}
      </ButtonOrLink>
    </Text>
  );
};

Link.propTypes = {
  bold: _pt.bool,
  baseline: _pt.bool,
  block: _pt.bool,
  children: _pt.any.isRequired,
  disabled: _pt.bool,
  inverted: _pt.bool,
  large: _pt.bool,
  muted: _pt.bool,
  override: _pt.object,
  small: _pt.bool
};

Link.defaultProps = {
  baseline: false,
  block: false,
  bold: false,
  disabled: false,
  inverted: false,
  large: false,
  muted: false,
  override: null,
  small: false
};

export default Link;
