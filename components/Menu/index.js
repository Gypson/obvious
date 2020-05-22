import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import Separator from './Separator';
import Item from './Item';
import Row from './Row';

const styleSheet = ({ color, unit, ui, pattern }) => ({
  menu: {
    ...pattern.box,
    margin: 0,
    padding: `${unit}px 0`,
    backgroundColor: color.accent.bg,
    listStyle: 'none',

    '@selectors': {
      '> li': {
        position: 'relative',
      },

      // These are jank. Better way?
      '> li:first-child > *': {
        borderTopLeftRadius: ui.borderRadius,
        borderTopRightRadius: ui.borderRadius,
      },

      '> li:last-child > *': {
        borderBottomLeftRadius: ui.borderRadius,
        borderBottomRightRadius: ui.borderRadius,
      },
    },
  },

  menu_nopadding: {
    padding: 0,
  },

  menu_scrollable: {
    overflowY: 'auto',
  },
});

const Menu = ({ accessibilityLabel, children, maxHeight, minWidth, overflow, role, noPadding }) => {
  const [styles, cx] = useStyles(styleSheet);
  const scrollable = !!maxHeight && !overflow;

  return (
    <ul
      role={role}
      aria-label={accessibilityLabel}
      className={cx(
        styles.menu,
        noPadding && styles.menu_nopadding,
        { maxHeight: scrollable ? maxHeight : 'auto', minWidth },
        scrollable && styles.menu_scrollable,
      )}
    >
      {children}
    </ul>
  );
};

Menu.propTypes = {
  children: _pt.node,
  accessibilityLabel: _pt.string.isRequired,
  maxHeight: _pt.oneOfType([_pt.number, _pt.string]),
  minWidth: _pt.number,
  noPadding: _pt.bool,
  role: _pt.string,
  overflow: _pt.bool,
};

Menu.defaultProps = {
  children: null,
  maxHeight: 'auto',
  minWidth: 200,
  noPadding: false,
  overflow: false,
  role: 'menu',
};

export { Item, Separator, Row };

export default Menu;
