import React from 'react';
import _pt from 'prop-types';

const DirectionalIcon = ({ direction, left: LeftIcon, right: RightIcon, ...props }) => {
  if (direction === 'left') {
    return <LeftIcon {...props} />;
  }

  return <RightIcon {...props} />;
};

DirectionalIcon.propTypes = {
  direction: _pt.oneOf(['left', 'right']).isRequired,
  left: _pt.elementType.isRequired,
  right: _pt.elementType.isRequired,
};

export default DirectionalIcon;
