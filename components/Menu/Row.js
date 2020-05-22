import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';

const styleSheet = ({ unit }) => ({
  item: {
    display: 'block',
    width: '100%',
    padding: unit,
    border: 0,
    textAlign: 'left',
  },

  item_spacious: {
    padding: unit * 2,
  },
});

const MenuRow = ({ children, spacious }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <li role="none">
      <div className={cx(styles.item, spacious && styles.item_spacious)}>{children}</div>
    </li>
  );
};

MenuRow.propTypes = {
  children: _pt.any.isRequired,
  spacious: _pt.bool,
};

MenuRow.defaultProps = {
  spacious: false,
};

export default MenuRow;
