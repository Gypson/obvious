import React from 'react';
import _pt from 'prop-types';
import useStyles, { aesthetic } from '../../hooks/useStyles';
import Button, { styleSheet } from '../Button';

export const newStyleSheet = aesthetic.extendStyles(
  // Base style sheet function
  styleSheet,
  ({ color }) => ({
    button: {
      backgroundColor: color.core.neutral[5],
      border: `2px solid ${color.core.neutral[5]}`,

      '@selectors': {
        ':not([disabled]):hover': {
          backgroundColor: color.core.neutral[6],
          borderColor: color.core.neutral[6],
        },
      },
    },

    button_inverted: {
      color: color.core.neutral[5],
      backgroundColor: color.accent.bg,

      '@selectors': {
        ':not([disabled]):hover': {
          color: color.core.neutral[6],
          backgroundColor: color.accent.bgHover,
        },
      },
    },
  }),
  // An imported style sheet function
);

const MutedButon = ({ children, ...props }) => {
  const [styles] = useStyles(newStyleSheet);

  return (
    <Button override={styles} {...props}>
      {children}
    </Button>
  );
};

MutedButon.propTypes = {
  children: _pt.any.isRequired,
};

export default MutedButon;
