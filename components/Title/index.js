import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";

const styleSheet = ({ color, font }) => ({
  title: {
    ...font.textReset,
    color: color.accent.text
  },

  title_inline: {
    display: "inline"
  },

  title_level1: {
    ...font.title1
  },

  title_level2: {
    ...font.title2
  },

  title_level3: {
    ...font.title3
  },

  title_inverted: {
    color: color.base
  },

  title_muted: {
    color: color.muted
  },

  title_primary: {
    color: color.core.primary[3]
  },

  title_left: {
    textAlign: "left"
  },

  title_center: {
    textAlign: "center"
  },

  title_right: {
    textAlign: "right"
  },
  title_truncated: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",

    "@selectors": {
      "> div": {
        display: "inline"
      }
    }
  }
});

const Title = ({
  level,
  inline,
  children,
  startAlign,
  centerAlign,
  endAlign,
  inverted,
  muted,
  primary,
  truncated
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const Tag = `h${level}`;

  return (
    <Tag
      className={cx(
        styles.title,
        level === 1 && styles.title_level1,
        level === 2 && styles.title_level2,
        level === 3 && styles.title_level3,
        inline && styles.title_inline,
        inverted && styles.title_inverted,
        muted && styles.title_muted,
        primary && styles.title_primary,
        startAlign && styles.title_left,
        centerAlign && styles.title_center,
        endAlign && styles.title_right,
        truncated && styles.title_truncated
      )}
    >
      {children}
    </Tag>
  );
};

Title.propTypes = {
  level: _pt.oneOf([1, 2, 3]).isRequired,
  inline: _pt.bool,
  children: _pt.node,
  centerAlign: _pt.bool,
  endAlign: _pt.bool,
  inverted: _pt.bool,
  muted: _pt.bool,
  primary: _pt.bool,
  startAlign: _pt.bool,
  truncated: _pt.bool
};

Title.defaultProps = {
  centerAlign: false,
  children: null,
  endAlign: false,
  inline: false,
  inverted: false,
  muted: false,
  primary: false,
  startAlign: false,
  truncated: false
};

export default Title;
