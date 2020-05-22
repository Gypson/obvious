import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";

const styleSheet = ({ ui, unit }) => ({
  row: {
    display: "flex"
  },

  row_compact: {
    paddingBottom: unit * 1.5,
    paddingTop: unit * 1.5
  },

  row_spacious: {
    paddingBottom: unit * 3,
    paddingTop: unit * 3
  },

  row_middleAlign: {
    alignItems: "center"
  },

  row_baseline: {
    borderBottom: ui.border
  },

  row_topline: {
    borderTop: ui.border
  },

  after: {
    paddingLeft: unit * 2,
    flexShrink: 0
  },

  after_compact: {
    paddingLeft: unit
  },

  before: {
    paddingRight: unit * 2,
    flexShrink: 0
  },

  before_compact: {
    paddingRight: unit
  },

  primary: {
    flex: 1,
    maxWidth: "100%"
  },

  primary_truncated: {
    overflow: "hidden"
  },

  primary_items_center: {
    display: "flex",
    alignItems: "center"
  }
});

const Row = ({
  after,
  baseline,
  before,
  center,
  children,
  compact,
  maxHeight,
  middleAlign,
  spacious,
  topline,
  truncated
}) => {
  const [styles, cx] = useStyles(styleSheet);
  return (
    <div
      className={cx(
        styles.row,
        { maxHeight },
        compact && styles.row_compact,
        spacious && styles.row_spacious,
        middleAlign && styles.row_middleAlign,
        baseline && styles.row_baseline,
        topline && styles.row_topline
      )}
    >
      {before && (
        <div className={cx(compact ? styles.before_compact : styles.before)}>
          {before}
        </div>
      )}

      <div
        className={cx(
          styles.primary,
          truncated && styles.primary_truncated,
          center && styles.primary_items_center
        )}
      >
        {children}
      </div>

      {after && (
        <div className={cx(compact ? styles.after_compact : styles.after)}>
          {after}
        </div>
      )}
    </div>
  );
};

Row.propTypes = {
  after: _pt.node,
  baseline: _pt.bool,
  before: _pt.node,
  center: _pt.bool,
  children: _pt.any.isRequired,
  compact: _pt.bool,
  middleAlign: _pt.bool,
  spacious: _pt.bool,
  topline: _pt.bool,
  truncated: _pt.bool
};

Row.defaultProps = {
  after: null,
  baseline: false,
  before: null,
  center: false,
  compact: false,
  middleAlign: false,
  spacious: false,
  topline: false,
  truncated: false
};

export default Row;
