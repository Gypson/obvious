import React from 'react';
import _pt from 'prop-types';
import FieldAffix from '../basic/FieldAffix';

const Suffix = ({ children, compact, disabled }) => {
  return (
    <FieldAffix after compact={compact} disabled={disabled}>
      {children}
    </FieldAffix>
  );
};

Suffix.propTypes = {
  children: _pt.node.isRequired,
  compact: _pt.bool,
  disabled: _pt.bool,
};

Suffix.defaultProps = {
  compact: false,
  disabled: false,
};

export default Suffix;
