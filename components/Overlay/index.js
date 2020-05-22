import React, { useEffect, useState, createRef } from 'react';
import _pt from 'prop-types';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import { scrollingParents } from '../../utils/isScrollable';
import Portal from './Portal';
import useForceUpdate from '../../utils/useForceUpdate';

const Overlay = ({ onClose, open, children, noBackground }) => {
  const forceUpdate = useForceUpdate();
  const [sx, setX] = useState(0);
  const [sy, setY] = useState(0);
  const ref = createRef();
  let scrollers = [];

  const addScrollListeners = () => {
    debounce(() => {
      const { current } = ref;
      removeScrollListeners();

      if (current) {
        scrollers = scrollingParents(current);
        scrollers.forEach(node => {
          node.addEventListener('scroll', handleScroll);
        });
      }
    });
  };

  const removeScrollListeners = () => {
    scrollers.forEach(node => {
      node.removeEventListener('scroll', handleScroll);
    });
    scrollers = [];
  };

  const handleResize = () => {
    forceUpdate();
  };

  const handleScroll = () => {
    throttle(() => onClose(), 100);
  };

  useEffect(() => {
    const { current } = ref;
    if (current) {
      const { x, y } = current.getBoundingClientRect();

      if (x !== sx) {
        setX(x);
      }

      if (y !== sy) {
        setY(y);
      }
    }
    removeScrollListeners();
    if (open && noBackground) {
      addScrollListeners();
    }
  });

  useEffect(() => {
    return () => {
      removeScrollListeners();
    };
  }, []);

  return (
    <div ref={ref}>
      {open && (
        <Portal x={sx} y={sy} noBackground={noBackground} onClose={onClose} onResize={handleResize}>
          {children}
        </Portal>
      )}
    </div>
  );
};

Overlay.propTypes = {
  children: _pt.node,
  open: _pt.bool,
  noBackground: _pt.bool,
  onClose: _pt.func.isRequired,
};

Overlay.defaultProps = {
  children: null,
  noBackground: false,
  open: false,
};

export default React.memo(Overlay);
