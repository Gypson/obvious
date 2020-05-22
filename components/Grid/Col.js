import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';

const styleSheet = ({ unit }) => {
  const spans = {};
  const offsets = {};

  Array.from({ length: 12 }, (v, k) => {
    const span = k + 1;
    const offset = k;
    const width = 100 / (12 / span);

    spans[`span${span}`] = {
      flexBasis: `${width}%`,
      maxWidth: `${width}%`,
    };

    offsets[`offset${offset}`] = {
      marginLeft: offset > 0 ? `${100 / (12 / offset)}%` : 0,
    };

    return span;
  });

  return {
    col: {
      flex: '0 0 auto',
      paddingLeft: unit,
      paddingRight: unit,
    },

    ...spans,
    ...offsets,
  };
};

/** A column within a grid. */
const Col = ({ children, offset, span }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div
      data-span={span}
      data-offset={offset}
      className={cx(styles.col, styles[`span${span}`], styles[`offset${offset}`])}
    >
      {children}
    </div>
  );
};

Col.propTypes = {
  children: _pt.any.isRequired,
  offset: _pt.oneOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]),
  span: _pt.oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]).isRequired,
};

Col.defaultProps = {
  offset: 0,
};

export default Col;
