import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import ButtonOrLink from '../basic/ButtonOrLink';
import Tooltip from '../Tooltip';

const styleSheet = ({ color, pattern, transition, unit, ui }) => ({
  button: {
    ...pattern.resetButton,
    ...transition.box,
    color: color.core.neutral[6],
    padding: unit / 2,
    borderRadius: ui.borderRadius,

    '@selectors': {
      ':not([disabled]):hover': {
        color: color.core.primary[3],
        backgroundColor: color.accent.bgHover,
      },
    },
  },

  button_active: {
    color: color.core.primary[3],
  },

  button_inverted: {
    color: color.base,
  },

  button_disabled: {
    ...pattern.disabled,
  },
});

const IconButton = ({ children, active, disabled, inverted, tooltip, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);

  const button = (
    <ButtonOrLink
      {...props}
      disabled={disabled}
      className={cx(
        styles.button,
        active && styles.button_active,
        inverted && styles.button_inverted,
        disabled && styles.button_disabled,
      )}
    >
      {children}
    </ButtonOrLink>
  );

  return tooltip ? (
    <Tooltip content={tooltip} disabled={disabled}>
      {button}
    </Tooltip>
  ) : (
    button
  );
};

IconButton.propTypes = {
  tooltip: _pt.node,
  inverted: _pt.bool,
  active: _pt.bool,
  disabled: _pt.bool,
  children: _pt.any.isRequired,
};

IconButton.defaultProps = {
  active: false,
  disabled: false,
  inverted: false,
  tooltip: null,
};

export default IconButton;
