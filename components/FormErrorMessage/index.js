import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import StatusText from '../StatusText';

const styleSheet = ({ unit }) => ({
  error: {
    marginTop: unit,
  },
});

const FormErrorMessage = ({ id, error }) => {
  const [styles, cx] = useStyles(styleSheet);

  if (!error) {
    return null;
  }

  return (
    <div id={`${id}-error`} role="alert" aria-live="polite" className={cx(styles.error)}>
      <StatusText danger>{error}</StatusText>
    </div>
  );
};

FormErrorMessage.propTypes = {
  id: _pt.string,
  error: _pt.string.isRequired,
};

FormErrorMessage.defaultProps = {
  id: null,
};

export default FormErrorMessage;
