import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';

const styleSheet = ({ ui, unit }) => ({
  item_bordered: {
    borderTop: ui.border,

    ':last-child': {
      borderBottom: ui.border,
    },
  },

  item_bordered_horizontal: {
    borderLeft: ui.border,

    ':last-child': {
      borderRight: ui.border,
    },
  },

  item_compact: {
    paddingBottom: unit / 2,
    paddingTop: unit / 2,
  },

  item_compact_horizontal: {
    paddingLeft: unit / 2,
    paddingRight: unit / 2,
  },

  item_spacious: {
    paddingBottom: unit,
    paddingTop: unit,
  },

  item_spacious_horizontal: {
    paddingLeft: unit,
    paddingRight: unit,
  },
});

const ListItem = ({ bordered, children, compact, horizontal, spacious }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <li
      className={cx(
        !horizontal && bordered && styles.item_bordered,
        horizontal && bordered && styles.item_bordered_horizontal,
        !horizontal && compact && styles.item_compact,
        horizontal && compact && styles.item_compact_horizontal,
        !horizontal && spacious && styles.item_spacious,
        horizontal && spacious && styles.item_spacious_horizontal,
      )}
    >
      {children}
    </li>
  );
};

ListItem.propTypes = {
  horizontal: _pt.bool,
  children: _pt.any.isRequired,
  bordered: _pt.bool,
  compact: _pt.bool,
  spacious: _pt.bool,
};

ListItem.defaultProps = {
  bordered: false,
  compact: false,
  horizontal: false,
  spacious: false,
};

export default ListItem;
