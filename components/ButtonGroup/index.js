import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';

const styleSheet = ({ unit }) => ({
  buttonGroup: {
    display: 'flex',
    alignItems: 'center',
  },

  buttonGroup_stacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  cell: {
    marginRight: unit,

    ':last-of-type': {
      marginRight: 0,
    },

    ':empty': {
      display: 'none',
    },
  },

  cell_stacked: {
    marginBottom: unit,

    ':last-of-type': {
      marginBottom: 0,
    },
  },
});

const ButtonGroup = ({ children, stacked }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.buttonGroup, stacked && styles.buttonGroup_stacked)}>
      {React.Children.map(children, child =>
        child ? (
          <div className={cx(stacked ? styles.cell_stacked : styles.cell)}>{child}</div>
        ) : null,
      )}
    </div>
  );
};

ButtonGroup.propTypes = {
  children: _pt.node.isRequired,
  stacked: _pt.bool,
};

ButtonGroup.defaultProps = {
  stacked: false,
};

export default ButtonGroup;
