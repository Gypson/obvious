import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';

const styleSheet = ({ color, unit, ui }) => {
  const { border, borderRadius } = ui;
  const notchSide = NOTCH_SIZE * unit;
  const offset = -notchSide / 2;
  const left = unit + notchSide / Math.SQRT2;

  return {
    box: {
      position: 'relative',
      borderRadius,
    },

    box_inline: {
      display: 'inline-block',
    },

    notch: {
      width: notchSide,
      height: notchSide,
      position: 'absolute',
      backgroundColor: color.core.neutral[0],
      transform: `translate(${offset}px, ${offset}px) rotate(-45deg)`,
    },

    notch_position: createPosition(left),

    notch_below: {
      bottom: -notchSide,
    },

    border: {
      border,
    },

    inverted: {
      borderColor: color.clear,
      backgroundColor: color.core.neutral[6],
    },

    content: {
      padding: NOTCH_SPACING * unit,
      position: 'relative',
      backgroundColor: color.core.neutral[0],
      borderRadius,
    },
  };
};

function createPosition(offset) {
  if (typeof offset === 'number' && offset < 0) {
    return {
      right: Math.abs(offset),
    };
  }

  return {
    left: offset,
  };
}

export const NOTCH_SIZE = 1.5;
export const NOTCH_SPACING = 1.5;

const NotchedBox = ({ inverted, children, inline, notchBelow, notchOffset }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.box, !inverted && styles.border, inline && styles.box_inline)}>
      <div
        className={cx(
          styles.notch,
          notchOffset ? createPosition(notchOffset) : styles.notch_position,
          notchBelow && styles.notch_below,
          inverted ? styles.inverted : styles.border,
        )}
      />

      <div className={cx(styles.content, inverted && styles.inverted)}>{children}</div>
    </div>
  );
};

NotchedBox.propTypes = {
  children: _pt.any.isRequired,
  inline: _pt.bool,
  inverted: _pt.bool,
  notchBelow: _pt.bool,
  notchOffset: _pt.oneOfType([_pt.number, _pt.string]),
};

NotchedBox.defaultProps = {
  inline: false,
  inverted: false,
  notchBelow: false,
  notchOffset: 0,
};

export default NotchedBox;
