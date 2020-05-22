import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import Spacing from "../Spacing";

const styleSheet = ({ color, unit, ui, font }) => ({
  divider: {
    borderBottom: ui.border
  },
  divider_short: {
    width: 4 * unit
  },
  divider_with_label: {
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    ":before": {
      content: '" "',
      width: "50%",
      height: "1px",
      background: color.core.neutral[2]
    },
    ":after": {
      content: '" "',
      width: "50%",
      height: "1px",
      background: color.core.neutral[2]
    }
  },
  divider_with_label_text: {
    flexGrow: 1,
    paddingLeft: unit * 4,
    paddingRight: unit * 4,
    overflowWrap: "break-word",
    ...font.textRegular
  }
});

const Divider = ({ bottom, short, top, label }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <Spacing bottom={bottom} top={top}>
      {label ? (
        <div className={cx(styles.divider_with_label)}>
          <div className={cx(styles.divider_with_label_text)}>{label}</div>
        </div>
      ) : (
        <div className={cx(styles.divider, short && styles.divider_short)} />
      )}
    </Spacing>
  );
};

Divider.propTypes = {
  bottom: _pt.any,
  short: _pt.bool,
  top: _pt.any,
  label: _pt.string
};

Divider.defaultProps = {
  bottom: 2,
  short: false,
  label: null,
  top: 2
};

export default Divider;
