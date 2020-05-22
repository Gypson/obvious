import React from 'react';
import _pt from 'prop-types';
import useStyles, { aesthetic } from '../../hooks/useStyles';
import Button, { styleSheet } from '../Button';

const newStyleSheet = aesthetic.extendStyles(
  // Base style sheet function
  styleSheet,
  ({ color }) => ({
    ...styleSheet,
    button: {
      backgroundColor: color.core.danger[5],
      border: `2px solid ${color.core.danger[5]}`,

      '@selectors': {
        ':not([disabled]):hover': {
          backgroundColor: color.core.danger[6],
          borderColor: color.core.danger[6],
        },
      },
    },

    button_inverted: {
      color: color.core.danger[5],
      backgroundColor: color.accent.bg,

      '@selectors': {
        ':not([disabled]):hover': {
          color: color.core.danger[6],
          backgroundColor: color.accent.bgHover,
        },
      },
    },
  }),
  // An imported style sheet function
);

const DangerButon = ({ children, ...props }) => {
  const [styles] = useStyles(newStyleSheet);

  return (
    <Button override={styles} {...props}>
      {children}
    </Button>
  );
};

DangerButon.propTypes = {
  children: _pt.any.isRequired,
};

export default DangerButon;
