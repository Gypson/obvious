import React from 'react';
import _pt from 'prop-types';
import useStyles, { aesthetic } from '../../hooks/useStyles';
import Button from '../Button';
import { newStyleSheet as styleSheet } from '../MutedButton';

const newStyleSheet = aesthetic.extendStyles(
  // Base style sheet function
  styleSheet,
  ({ color, pattern }) => ({
    ...styleSheet,
    button_invalid: {
      ...pattern.invalid,

      '@selectors': {
        ':not([disabled]):hover': {
          ...pattern.invalid,
        },
      },
    },

    button_inverted: {
      color: color.accent.text,
      borderColor: color.accent.border,

      '@selectors': {
        ':not([disabled]):hover': {
          color: color.accent.text,
          borderColor: color.accent.borderHover,
        },
      },
    },
  }),
  // An imported style sheet function
);

const FormInputButton = ({ children, ...props }) => {
  const [styles] = useStyles(newStyleSheet);

  return (
    <Button override={styles} {...props}>
      {children}
    </Button>
  );
};

FormInputButton.propTypes = {
  children: _pt.any.isRequired,
};

export default FormInputButton;
