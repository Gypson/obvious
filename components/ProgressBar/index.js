import React from "react";
import _pt from "prop-types";
import { between } from "airbnb-prop-types";
import useStyles from "../../hooks/useStyles";

const styleSheet = ({ color, unit, ui }) => ({
  wrapper: {
    paddingTop: unit / 4,
    paddingBottom: unit / 4
  },

  bar: {
    height: unit / 2,
    background: color.core.neutral[2]
  },

  bar_leading: {
    borderTopRightRadius: ui.borderRadius,
    borderBottomRightRadius: ui.borderRadius
  },

  bar_trailing: {
    borderTopLeftRadius: ui.borderRadius,
    borderBottomLeftRadius: ui.borderRadius
  },

  progress: {
    background: color.core.primary[3]
  }
});

const ProgressBar = ({ leading, percent, trailing }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.wrapper)}>
      <div
        className={cx(
          styles.bar,
          !leading && styles.bar_leading,
          !trailing && styles.bar_trailing
        )}
      >
        <div
          className={cx(
            styles.bar,
            !leading && styles.bar_leading,
            !trailing && styles.bar_trailing,
            styles.progress
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  leading: _pt.bool,
  percent: between({ gte: 0, lte: 100 }).isRequired,
  trailing: _pt.bool
};

ProgressBar.defaultProps = {
  leading: false,
  trailing: false
};

export default ProgressBar;
