import React from 'react';
import useStyles from '../../hooks/useStyles';

const styleSheet = ({ color, unit }) => ({
  separator: {
    marginTop: unit,
    marginBottom: unit,
    padding: 0,
    border: 0,
    height: 1,
    background: color.accent.border,
  },
});

const MenuSeparator = () => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <li role="separator">
      <hr className={cx(styles.separator)} />
    </li>
  );
};

export default MenuSeparator;
