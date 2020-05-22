import React from 'react';
import _pt from 'prop-types';
// import Theme from '../../composers/withStyles';
import Alert from '../Alert';
import Button from '../Button';
import Spacing from '../Spacing';
import StatusText from '../StatusText';

export function getErrorMessage(error, includeCode) {
  const debug = error.debug_info;

  const message = debug
    ? `${debug.error_class} - ${debug.error_message || debug.response_message}`
    : error.user_message || error.error_details || error.error_message || error.message;

  if (includeCode && error.error_code) {
    return `${error.error_code} - ${message}`;
  }

  return message || '';
}

//FIX THIS - Come up with a RedirectURL

const ErrorMessage = ({ error, inline, title, subtitle, onClose }) => {
  if (!error) {
    return null;
  }

  const message = subtitle || getErrorMessage(error);
  const code = error instanceof Error ? null : error.error_code;
  const id = error instanceof Error ? null : error.error_id;
  // const url = error instanceof Error ? '' : error.error_url; //FIX This - Add RedirectURL

  if (inline) {
    return <StatusText danger>{message}</StatusText>;
  }

  return (
    <Alert danger title={title || code || 'Unknown Error'} onClose={onClose}>
      {message}

      {id && (
        <Spacing top={1}>
          <Button
            inverted
            onClick={() => {
              alert('FIX THIS');
            }} /* FIX THIS MAKE IT WORK createRedirectURL(id, url)}*/
          >
            View error details
          </Button>
        </Spacing>
      )}
    </Alert>
  );
};

ErrorMessage.propTypes = {
  error: _pt.any,
  inline: _pt.bool,
  title: _pt.node,
  subtitle: _pt.node,
  onClose: _pt.func,
};

ErrorMessage.defaultProps = {
  error: null,
  inline: false,
  onClose: null,
  subtitle: null,
  title: null,
};

export default ErrorMessage;
