import React, { useState, useEffect, createRef } from 'react';
import _pt from 'prop-types';
import uuid from 'uuid/v4';
import useStyles from '../../hooks/useStyles';
import useTheme from '../../hooks/useTheme';
import Overlay from '../Overlay';
import NotchedBox, { NOTCH_SIZE, NOTCH_SPACING } from '../NotchedBox';
import Text from '../Text';

const EMPTY_TARGET_RECT = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
};

const styleSheet = ({ color, pattern, unit, ui }) => ({
  container: {
    display: 'inline-block',
  },

  offscreen: {
    ...pattern.offscreen,
  },

  underlined: {
    borderBottom: `1px dotted ${color.core.primary[3]}`,
    cursor: 'help',
  },

  tooltip: {
    animationDuration: '200ms',
    animationTimingFunction: 'ease-out',
  },

  tooltip_above: {
    animationName: {
      name: 'fadeDown',
      from: {
        opacity: 0,
        transform: `translateY(${unit * 1.5}px)`,
      },
      to: {
        opacity: 1,
      },
    },
  },

  tooltip_below: {
    animationName: {
      name: 'fadeUp',
      from: {
        opacity: 0,
        transform: `translateY(-${unit * 1.5}px)`,
      },
      to: {
        opacity: 1,
      },
    },
  },

  shadow: {
    display: 'inline-block',
    boxShadow: ui.boxShadowLarge,
    borderRadius: ui.borderRadius,
  },
});

const Tooltip = ({
  width: widthProp,
  children,
  content,
  disabled,
  underlined,
  inverted,
  remainOnMouseDown,
  onShow,
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();
  const [labelID] = useState(uuid());
  const [open, setOpen] = useState(false);
  const [tooltipHeight, setToolTipHeight] = useState(false);
  const [targetRect, setTargetReact] = useState(EMPTY_TARGET_RECT);

  const containerRef = createRef();
  let currentTooltipRef = null;
  const refHandle = void 0;

  const handleTooltipRef = ref => {
    currentTooltipRef = ref;
    updateTooltipHeight();
  };

  const handleEnter = () => {
    const { current } = containerRef;

    if (current) {
      setTargetReact(current.getBoundingClientRect());
    }

    if (!disabled && !open) {
      setOpen(true);
      onShow();
    }
  };

  const handleMouseDown = () => {
    if (remainOnMouseDown) {
      handleClose();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setTargetReact(document.body.getBoundingClientRect());

    return () => {
      cancelAnimationFrame(refHandle);
    };
  }, []);

  useEffect(() => {
    updateTooltipHeight();
  }, [content]);

  const updateTooltipHeight = () => {
    const el = currentTooltipRef;
    setToolTipHeight(el ? el.offsetHeight : 0);
  };

  const bestPosition = rect => {
    const output = {
      above: false,
      align: 'left',
    };

    if (rect && widthProp) {
      const { width: targetWidth, left, right, top } = rect;
      const unit = 8;
      const rightSpace = window.innerWidth - right;

      if (top > window.innerHeight * 0.6) {
        output.above = true;
      }

      if (Math.min(left, rightSpace) - unit > (widthProp * unit - targetWidth) / 2) {
        output.align = 'center';
      } else if (rightSpace < left) {
        output.align = 'right';
      }
    }

    return output;
  };

  const { unit } = theme;
  const width = widthProp * unit;
  const { align, above } = bestPosition(targetRect);
  const targetWidth = targetRect.width;
  const halfNotch = (NOTCH_SIZE * unit) / Math.SQRT2;
  const notchOffset = {
    center: '50%',
    right: -(unit * NOTCH_SPACING + halfNotch),
  };
  const marginLeft = {
    center: -width / 2 + targetWidth / 2,
    right: -width + targetWidth,
  };
  const distance = halfNotch + 1;

  return (
    <span className={cx(styles.container)} ref={containerRef}>
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        aria-labelledby={labelID}
        onMouseEnter={handleEnter}
        onMouseLeave={handleClose}
        onMouseDown={handleMouseDown}
        className={cx(!disabled && underlined && styles.underlined)}
      >
        {children}
      </div>

      <div id={labelID} className={cx(styles.offscreen)}>
        {content}
      </div>

      <Overlay open={open} onClose={handleClose} noBackground>
        <div
          role="tooltip"
          className={cx(styles.tooltip, above ? styles.tooltip_above : styles.tooltip_below, {
            width,
            marginLeft: marginLeft[align],
            marginTop: above ? -(tooltipHeight + targetRect.height + distance) : distance,
            textAlign: align,
          })}
          ref={handleTooltipRef}
        >
          <div className={cx(styles.shadow)}>
            <NotchedBox inverted={!inverted} notchOffset={notchOffset[align]} notchBelow={above}>
              <Text inverted={!inverted}>{content}</Text>
            </NotchedBox>
          </div>
        </div>
      </Overlay>
    </span>
  );
};

Tooltip.propTypes = {
  width: _pt.number,
  content: _pt.any.isRequired,
  children: _pt.any.isRequired,
  disabled: _pt.bool,
  inverted: _pt.bool,
  remainOnMouseDown: _pt.bool,
  underlined: _pt.bool,
  onShow: _pt.func,
};
Tooltip.defaultProps = {
  disabled: false,
  inverted: false,
  onShow() {},
  remainOnMouseDown: false,
  underlined: false,
  width: 35,
};

export default Tooltip;
