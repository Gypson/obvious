import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import withBoundary from '../../composers/withBoundary';
import Cell from './Cell';
import Row from './Row';

const styleSheet = ({ color, unit, ui }) => {
  function createCell(styles) {
    return {
      '@selectors': {
        ':only-child td': styles,
        ':only-child th': styles,
      },
    };
  }

  return {
    table: {
      width: '100%',
      maxWidth: '100%',
      margin: 0,
      padding: 0,
      backgroundColor: color.accent.bg,
      border: '1px solid transparent',
      borderCollapse: 'collapse',
      borderSpacing: 0,

      '@selectors': {
        ':only-child td': {
          padding: unit * 1.5,
          verticalAlign: 'top',
        },

        ':only-child th': {
          padding: unit * 1.5,
          verticalAlign: 'bottom',
          whiteSpace: 'nowrap',
        },
      },
    },

    table_bordered: {
      border: ui.border,
    },

    table_compact: {
      ...createCell({
        padding: unit,
      }),
    },

    table_horizontal: {
      '@selectors': {
        ':only-child > tbody > tr > td': {
          borderTop: ui.border,
        },
      },
    },

    table_fixed: {
      display: 'table',
      tableLayout: 'fixed',
    },

    table_loading: {
      pointerEvents: 'none',
      opacity: 0.5,
    },

    table_striped: {
      '@selectors': {
        ':only-child > tbody > tr': {
          backgroundColor: color.accent.bg,

          '@selectors': {
            ':nth-child(odd)': {
              backgroundColor: color.accent.bgHover,
            },
          },
        },
      },
    },

    table_transparent: {
      backgroundColor: 'transparent',
    },

    table_vertical: {
      ...createCell({
        borderLeft: ui.border,
        borderRight: ui.border,
      }),
    },

    responsive_wrapper: {
      maxWidth: '100%',
      overflowX: 'auto',
    },
    content_middle_align: {
      '@selectors': {
        ':only-child td': {
          verticalAlign: 'middle',
        },
      },
    },
  };
};

const Table = ({
  bordered,
  children,
  compact,
  fixed,
  horizontal,
  loading,
  middleAlign,
  striped,
  transparent,
  vertical,
}) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.responsive_wrapper)}>
      <table
        className={cx(
          styles.table,
          middleAlign && styles.content_middle_align,
          fixed && styles.table_fixed,
          bordered && styles.table_bordered,
          horizontal && styles.table_horizontal,
          vertical && styles.table_vertical,
          compact && styles.table_compact,
          striped && styles.table_striped,
          loading && styles.table_loading,
          transparent && styles.table_transparent,
        )}
      >
        {children}
      </table>
    </div>
  );
};

Table.propTypes = {
  bordered: _pt.bool,
  children: _pt.node.isRequired,
  compact: _pt.bool,
  fixed: _pt.bool,
  horizontal: _pt.bool,
  loading: _pt.bool,
  middleAlign: _pt.bool,
  striped: _pt.bool,
  transparent: _pt.bool,
  vertical: _pt.bool,
};

Table.defaultProps = {
  bordered: false,
  compact: false,
  fixed: false,
  horizontal: false,
  loading: false,
  middleAlign: false,
  striped: false,
  transparent: false,
  vertical: false,
};

export { Cell, Row };
export default withBoundary('Table')(Table);
