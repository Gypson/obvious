import React from 'react';
import _pt from 'prop-types';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import { STATUSES } from '../../constants';
import useStyles from '../../hooks/useStyles';
import Text from '../Text';

const statusPropType = mutuallyExclusiveTrueProps(...STATUSES);

const styleSheet = ({ color }) => ({
  text_danger: {
    color: color.core.danger[4],
  },

  text_info: {
    color: color.core.primary[4],
  },

  text_muted: {
    color: color.muted,
  },

  text_notice: {
    color: color.core.secondary[4],
  },

  text_success: {
    color: color.core.success[4],
  },

  text_warning: {
    color: color.core.warning[5],
  },
});

const StatusText = ({ children, danger, info, muted, notice, success, warning, ...props }) => {
  let [styles, cx] = useStyles(styleSheet);

  return (
    <Text {...props}>
      <span
        className={cx(
          danger && styles.text_danger,
          info && styles.text_info,
          muted && styles.text_muted,
          notice && styles.text_notice,
          success && styles.text_success,
          warning && styles.text_warning,
        )}
      >
        {children}
      </span>
    </Text>
  );
};

StatusText.propTypes = {
  children: _pt.any.isRequired,
  danger: statusPropType,
  info: statusPropType,
  muted: statusPropType,
  notice: statusPropType,
  success: statusPropType,
  warning: statusPropType,
};

StatusText.defaultProps = {
  danger: false,
  info: false,
  muted: false,
  notice: false,
  success: false,
  warning: false,
};

export default StatusText;
