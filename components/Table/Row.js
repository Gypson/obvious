import React from 'react';
import _pt from 'prop-types';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import { STATUSES } from '../../constants';

const statusPropType = mutuallyExclusiveTrueProps(...STATUSES);

const styleSheet = ({ color }) => {
  function createRow(hex) {
    return {
      // Overrides table specificity
      '@selectors': {
        ':nth-child(n) > td': {
          backgroundColor: hex,
        },
      },
    };
  }

  return {
    row_danger: createRow(color.core.danger[0]),
    row_info: createRow(color.core.primary[0]),
    row_muted: createRow(color.core.neutral[0]),
    row_notice: createRow(color.core.secondary[0]),
    row_success: createRow(color.core.success[0]),
    row_warning: createRow(color.core.warning[0]),
  };
};

const TableRow = ({ children, danger, info, muted, notice, success, warning, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <tr
      {...props}
      className={cx(
        danger && styles.row_danger,
        info && styles.row_info,
        muted && styles.row_muted,
        notice && styles.row_notice,
        success && styles.row_success,
        warning && styles.row_warning,
      )}
    >
      {children}
    </tr>
  );
};

TableRow.propTypes = {
  danger: statusPropType,
  info: statusPropType,
  muted: statusPropType,
  notice: statusPropType,
  success: statusPropType,
  warning: statusPropType,
  children: _pt.node.isRequired,
};

TableRow.defaultProps = {
  danger: false,
  info: false,
  muted: false,
  notice: false,
  success: false,
  warning: false,
};

export default TableRow;
