import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';

const styleSheet = () => ({
  cell_truncate: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',

    ':hover': {
      maxWidth: 'none',
      overflow: 'inherit',
      whiteSpace: 'inherit',
      wordWrap: 'break-word',
    },
  },

  cell_left: {
    textAlign: 'left',
  },

  cell_center: {
    textAlign: 'center',
  },

  cell_right: {
    textAlign: 'right',
  },

  cell_wrap: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
});

const TableCell = ({
  centerAlign,
  children,
  header,
  startAlign,
  endAlign,
  truncate,
  wrap,
  ...props
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const Tag = header ? 'th' : 'td';

  return (
    <Tag
      {...props}
      className={cx(
        truncate && styles.cell_truncate,
        startAlign && styles.cell_left,
        centerAlign && styles.cell_center,
        endAlign && styles.cell_right,
        wrap && styles.cell_wrap,
      )}
    >
      {children}
    </Tag>
  );
};

TableCell.propTypes = {
  centerAlign: _pt.bool,
  endAlign: _pt.bool,
  header: _pt.bool,
  startAlign: _pt.bool,
  truncate: _pt.bool,
  wrap: _pt.bool,
  children: _pt.node,
};

TableCell.defaultProps = {
  centerAlign: false,
  children: null,
  endAlign: false,
  header: false,
  startAlign: false,
  truncate: false,
  wrap: false,
};

export default TableCell;
