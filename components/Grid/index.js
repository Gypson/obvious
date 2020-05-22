import React from 'react';
import _pt from 'prop-types';
import { childrenOfType, mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';
import Col from './Col';

const horizontalAlignProp = mutuallyExclusiveTrueProps('centerAlign', 'startAlign', 'endAlign');
const verticalAlignProp = mutuallyExclusiveTrueProps('bottomAlign', 'middleAlign', 'topAlign');

const styleSheet = ({ unit }) => ({
  grid: {
    display: 'flex',
    flex: '0 1 auto',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    marginLeft: -unit,
    marginRight: -unit,
  },

  grid_reversed: {
    flexDirection: 'row-reverse',
  },

  grid_center: {
    justifyContent: 'center',
  },

  grid_start: {
    justifyContent: 'flex-start',
  },

  grid_end: {
    justifyContent: 'flex-end',
  },

  grid_top: {
    alignItems: 'flex-start',
  },

  grid_middle: {
    alignItems: 'center',
  },

  grid_bottom: {
    alignItems: 'flex-end',
  },
});

/** A column within a grid. */
const Grid = ({
  bottomAlign,
  centerAlign,
  children,
  endAlign,
  middleAlign,
  reversed,
  startAlign,
  topAlign,
}) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <section
      className={cx(
        styles.grid,
        reversed && styles.grid_reversed,
        bottomAlign && styles.grid_bottom,
        middleAlign && styles.grid_middle,
        topAlign && styles.grid_top,
        startAlign && styles.grid_start,
        endAlign && styles.grid_end,
        centerAlign && styles.grid_center,
      )}
    >
      {children}
    </section>
  );
};

Grid.propTypes = {
  bottomAlign: verticalAlignProp,
  centerAlign: horizontalAlignProp,
  children: childrenOfType(Col).isRequired,
  endAlign: horizontalAlignProp,
  middleAlign: verticalAlignProp,
  reversed: _pt.bool,
  startAlign: horizontalAlignProp,
  topAlign: verticalAlignProp,
};

Grid.defaultProps = {
  bottomAlign: false,
  centerAlign: false,
  endAlign: false,
  middleAlign: false,
  reversed: false,
  startAlign: false,
  topAlign: false,
};

export { Col };
export default Grid;
