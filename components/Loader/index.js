import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";

const styleSheet = ({ color, unit }) => ({
  loader: {
    margin: "0 auto",
    textAlign: "center"
  },

  loader_absolute: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)"
  },

  loader_inline: {
    display: "inline-block"
  },

  dot: {
    width: 6,
    height: 6,
    marginRight: unit / 2,
    borderRadius: "100%",
    display: "inline-block",
    animationName: {
      name: "fade",
      "0%, 80%, 100%": {
        opacity: 0
      },
      "30%, 50%": {
        opacity: 1
      }
    },
    animationDuration: "0.8s",
    animationIterationCount: "infinite",
    animationTimingFunction: "linear",
    animationFillMode: "both",
    verticalAlign: "middle",
    backgroundColor: color.core.primary[3]
  },

  dot_inverted: {
    backgroundColor: color.accent.bg
  },

  dot_large: {
    width: 12,
    height: 12,
    marginRight: unit
  },

  dot_small: {
    width: 3,
    height: 3,
    marginRight: 2
  },

  dot_1: {
    animationDelay: "-0.3s"
  },

  dot_2: {
    animationDelay: "-0.15s"
  }
});

const Loader = ({ inline, inverted, large, small, static: isStatic }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div
      className={cx(
        styles.loader,
        inline && styles.loader_inline,
        !isStatic && !inline && styles.loader_absolute
      )}
    >
      {[1, 2, 3].map(no => (
        <span
          key={no}
          className={cx(
            styles.dot,
            styles[`dot_${no}`],
            large && styles.dot_large,
            small && styles.dot_small,
            inverted && styles.dot_inverted
          )}
        />
      ))}
    </div>
  );
};

Loader.propTypes = {
  inline: _pt.bool,
  inverted: _pt.bool,
  large: _pt.bool,
  static: _pt.bool
};

Loader.defaultProps = {
  inline: false,
  inverted: false,
  large: false,
  static: false
};

export default Loader;
