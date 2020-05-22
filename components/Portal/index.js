import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import _pt from 'prop-types';

let node = void 0;

const Portal = ({ children }) => {
  useEffect(() => {
    return () => {
      if (node) {
        document.body.removeChild(node);
        node = null;
      }
    };
  }, []);

  if (!node) {
    node = document.createElement('div');
    node.setAttribute('id', 'portal');
    document.body.appendChild(node);
  }

  return ReactDOM.createPortal(children, node);
};

Portal.propTypes = {
  children: _pt.any.isRequired,
};

export default React.memo(Portal);
