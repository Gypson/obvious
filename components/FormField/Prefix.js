import React from 'react';
import _pt from 'prop-types';
import FieldAffix from '../basic/FieldAffix';

const Prefix = ({ children, compact, disabled }) => {
  return (
    <FieldAffix after compact={compact} disabled={disabled}>
      {children}
    </FieldAffix>
  );
};

Prefix.propTypes = {
  children: _pt.node.isRequired,
  compact: _pt.bool,
  disabled: _pt.bool,
};

Prefix.defaultProps = {
  compact: false,
  disabled: false,
};

export default Prefix;
