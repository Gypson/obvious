import React from 'react';
import _pt from 'prop-types';

const BrowserNotification = ({ title, tag, body, icon, timeout, onClick }) => {
  let closeTimeout;
  let notification;

  React.useEffect(() => {
    showNotification();

    return () => {
      if (closeTimeout) {
        window.clearTimeout(this.closeTimeout);
      }

      if (notification) {
        notification.close();
      }
    };
  });

  const showNotification = () => {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        notification = new Notification(title, {
          tag,
          body,
          icon,
        });

        if (onClick) {
          notification.addEventListener('click', onClick);
        }

        if (timeout) {
          closeTimeout = window.setTimeout(() => {
            closeTimeout = 0;

            if (notification) {
              notification.close();
              notification = null;
            }
          }, timeout);
        }
      }

      /* istanbul ignore next */
      if ('production' !== process.env.NODE_ENV && permission !== 'granted') {
        // eslint-disable-next-line no-console
        console.warn('Attempted to show a notification, but was denied permission.');
      }
    });
  };

  return null;
};

BrowserNotification.propTypes = {
  title: _pt.string.isRequired,
  tag: _pt.string,
  body: _pt.string,
  icon: _pt.string,
  timeout: _pt.number,
  onClick: _pt.func,
};

BrowserNotification.defaultProps = {
  body: null,
  icon: null,
  onClick: null,
  tag: null,
  timeout: null,
};

export default React.memo(BrowserNotification);
