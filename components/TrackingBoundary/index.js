import React from 'react';
import _pt from 'prop-types';
import componentName from '../../prop-types/componentName';

const TrackingBoundary = ({ children, name }) => {
  const handleTrackContext = ({ nativeEvent }) => {
    if (!name) {
      return;
    }

    if (nativeEvent.trackingContext) {
      nativeEvent.trackingContext.push(name);
    } else {
      nativeEvent.trackingContext = [name];
    }
  };
  if (!name) {
    return children;
  }

  return (
    <tracking-boundary
      onClick={handleTrackContext}
      onKeyDown={handleTrackContext}
      data-tracking-name={name}
    >
      {children}
    </tracking-boundary>
  );
};

TrackingBoundary.propTypes = {
  children: _pt.node.isRequired,
  name: componentName,
};

TrackingBoundary.defaultProps = {
  name: '',
};

export default TrackingBoundary;
