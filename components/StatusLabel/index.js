import React from 'react';
import _pt from 'prop-types';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import iconComponent from '../../prop-types/iconComponent';
import IconAffix from '../basic/IconAffix';
import { STATUSES, BRANDS } from '../../constants';

const statusPropType = mutuallyExclusiveTrueProps(...STATUSES, ...BRANDS);

const styleSheet = ({ color, unit, font, ui }) => ({
  label: {
    ...font.textMicro,
    display: 'inline-block',
    justifyContent: 'space-between',
    alignItems: 'center',
    verticalAlign: 'middle',
    whiteSpace: 'nowrap',
    marginRight: unit / 2,
    paddingLeft: unit,
    paddingRight: unit,
    paddingTop: unit / 2,
    paddingBottom: unit / 2,
    borderRadius: ui.borderRadius,
    backgroundColor: color.core.neutral[1],
    color: color.accent.text,
    fontWeight: font.weights.bold,
    border: ui.border,
    borderColor: 'transparent',
  },

  label_uppercased: {
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  label_bordered: {
    borderColor: color.accent.border,
  },

  label_compact: {
    paddingLeft: 0.75 * unit,
    paddingRight: 0.75 * unit,
    paddingTop: unit / 4,
    paddingBottom: unit / 4,
  },

  label_inverted: {
    backgroundColor: color.clear,
    color: color.accent.text,
  },

  label_danger: {
    backgroundColor: color.core.danger[1],
  },

  label_inverted_danger: {
    color: color.core.danger[3],
  },

  label_info: {
    backgroundColor: color.core.primary[1],
  },

  label_inverted_info: {
    color: color.core.primary[3],
  },

  label_luxury: {
    backgroundColor: color.brand.luxury[3],
    color: color.base,
  },

  label_inverted_luxury: {
    color: color.brand.luxury[3],
  },

  label_muted: {
    backgroundColor: color.core.neutral[2],
  },

  label_inverted_muted: {
    color: color.core.neutral[3],
  },

  label_notice: {
    backgroundColor: color.core.secondary[1],
  },

  label_inverted_notice: {
    color: color.core.secondary[3],
  },

  label_plus: {
    backgroundColor: color.brand.plus[3],
    color: color.base,
  },

  label_inverted_plus: {
    color: color.brand.plus[3],
  },

  label_success: {
    backgroundColor: color.core.success[1],
  },

  label_inverted_success: {
    color: color.core.success[3],
  },

  label_warning: {
    backgroundColor: color.core.warning[1],
  },

  label_inverted_warning: {
    color: color.core.warning[6],
  },
});

const StatusLabel = ({
  afterIcon,
  beforeIcon,
  bordered,
  children,
  compact,
  danger,
  info,
  inverted,
  luxury,
  muted,
  notice,
  plus,
  success,
  uppercased,
  warning,
}) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <span
      className={cx(
        styles.label,
        uppercased && styles.label_uppercased,
        inverted && styles.label_inverted,
        bordered && styles.label_bordered,
        compact && styles.label_compact,
        danger && (inverted ? styles.label_inverted_danger : styles.label_danger),
        info && (inverted ? styles.label_inverted_info : styles.label_info),
        muted && (inverted ? styles.label_inverted_muted : styles.label_muted),
        notice && (inverted ? styles.label_inverted_notice : styles.label_notice),
        success && (inverted ? styles.label_inverted_success : styles.label_success),
        warning && (inverted ? styles.label_inverted_warning : styles.label_warning),
        luxury && (inverted ? styles.label_inverted_luxury : styles.label_luxury),
        plus && (inverted ? styles.label_inverted_plus : styles.label_plus),
      )}
    >
      {beforeIcon && <IconAffix before>{beforeIcon}</IconAffix>}

      <span>{children}</span>

      {afterIcon && <IconAffix after>{afterIcon}</IconAffix>}
    </span>
  );
};

StatusLabel.propTypes = {
  afterIcon: iconComponent,
  beforeIcon: iconComponent,
  danger: statusPropType,
  info: statusPropType,
  luxury: statusPropType,
  muted: statusPropType,
  notice: statusPropType,
  plus: statusPropType,
  success: statusPropType,
  warning: statusPropType,
  bordered: _pt.bool,
  compact: _pt.bool,
  inverted: _pt.bool,
  uppercased: _pt.bool,
  children: _pt.node.isRequired,
};

StatusLabel.defaultProps = {
  afterIcon: null,
  beforeIcon: null,
  bordered: false,
  compact: false,
  danger: false,
  info: false,
  inverted: false,
  luxury: false,
  muted: false,
  notice: false,
  plus: false,
  success: false,
  uppercased: false,
  warning: false,
};

export default StatusLabel;
