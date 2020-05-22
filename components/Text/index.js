import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";

const styleSheet = ({ font, pattern, color }) => ({
  text: {
    ...font.textReset,
    ...font.textRegular,
    color: color.accent.text
  },

  text_baseline: {
    display: "inline"
  },

  text_inline: {
    display: "inline-block"
  },

  text_preserveWhitespace: {
    whiteSpace: "pre-wrap"
  },

  text_atom: {
    ...font.textAtom
  },

  text_micro: {
    ...font.textMicro
  },

  text_small: {
    ...font.textSmall
  },

  text_large: {
    ...font.textLarge
  },

  text_disabled: {
    ...pattern.disabled
  },

  text_inverted: {
    color: color.base
  },

  text_muted: {
    color: color.muted
  },

  text_primary: {
    color: color.core.primary[3]
  },

  text_bold: {
    fontWeight: font.weights.semibold
  },

  text_light: {
    fontWeight: font.weights.light
  },

  text_truncated: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    "@selectors": {
      "> div": {
        display: "inline"
      }
    }
  },

  text_uppercased: {
    textTransform: "uppercase"
  },

  text_uppercased_micro: {
    letterSpacing: 1
  },

  text_uppercased_atom: {
    letterSpacing: 1
  },

  text_center: {
    textAlign: "center"
  },

  text_end: {
    textAlign: "right"
  },

  text_start: {
    textAlign: "left"
  },

  text_noWrap: {
    whiteSpace: "nowrap"
  },

  leading_none: {
    lineHeight: 1
  },
  leading_tight: {
    lineHeight: 1.25
  },
  leading_snug: {
    lineHeight: 1.375
  },
  leading_normal: {
    lineHeight: 1.5
  },
  leading_relaxed: {
    lineHeight: 1.625
  },
  leading_loose: {
    lineHeight: 2
  }
});

const Text = ({
  atom,
  baseline,
  bold,
  capatilize,
  centerAlign,
  children,
  disabled,
  endAlign,
  inline,
  inverted,
  large,
  light,
  micro,
  muted,
  noWrap,
  preserveWhitespace,
  primary,
  small,
  startAlign,
  truncated,
  uppercased,
  leading
}) => {
  const [styles, cx] = useStyles(styleSheet);

  let Tag = "div";

  if (inline) {
    Tag = "span";
  } else if (micro || atom) {
    Tag = "small";
  } else if (large) {
    Tag = "h4";
  }

  return (
    <Tag
      className={cx(
        styles.text,
        bold && styles.text_bold,
        disabled && styles.text_disabled,
        inline && styles.text_inline,
        baseline && styles.text_baseline,
        inverted && styles.text_inverted,
        large && styles.text_large,
        light && styles.text_light,
        micro && styles.text_micro,
        atom && styles.text_atom,
        muted && styles.text_muted,
        preserveWhitespace && styles.text_preserveWhitespace,
        small && styles.text_small,
        truncated && styles.text_truncated,
        uppercased && styles.text_uppercased,
        micro && uppercased && styles.text_uppercased_micro,
        atom && uppercased && styles.text_uppercased_micro,
        centerAlign && styles.text_center,
        endAlign && styles.text_end,
        startAlign && styles.text_start,
        noWrap && styles.text_noWrap,
        primary && styles.text_primary,
        leading === "none" && styles.leading_none,
        leading === "tight" && styles.leading_tight,
        leading === "snug" && styles.leading_snug,
        leading === "normal" && styles.leading_normal,
        leading === "relaxed" && styles.leading_relaxed,
        leading === "loose" && styles.leading_loose
      )}
    >
      {children}
    </Tag>
  );
};

Text.propTypes = {
  uppercased: _pt.bool,
  truncated: _pt.bool,
  preserveWhitespace: _pt.bool,
  noWrap: _pt.bool,
  inline: _pt.bool,
  children: _pt.any,
  baseline: _pt.bool,
  bold: _pt.bool,
  centerAlign: _pt.bool,
  disabled: _pt.bool,
  endAlign: _pt.bool,
  inverted: _pt.bool,
  large: _pt.bool,
  light: _pt.bool,
  micro: _pt.bool,
  muted: _pt.bool,
  primary: _pt.bool,
  small: _pt.bool,
  startAlign: _pt.bool,
  leading: _pt.oneOf(["none", "tight", "snug", "normal", "relaxed", "loose"])
    .isRequired
};

Text.defaultProps = {
  baseline: false,
  bold: false,
  centerAlign: false,
  children: null,
  disabled: false,
  endAlign: false,
  inline: false,
  inverted: false,
  large: false,
  light: false,
  micro: false,
  muted: false,
  noWrap: false,
  preserveWhitespace: false,
  primary: false,
  small: false,
  startAlign: false,
  truncated: false,
  uppercased: false,
  leading: "normal"
};

export default Text;
