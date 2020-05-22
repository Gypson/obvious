import React from 'react';
import _pt from 'prop-types';
import IconChevronLeft from '../../../../icons/src/interface/IconChevronLeft';
import IconChevronRight from '../../../../icons/src/interface/IconChevronRight';
import IconChevronDown from '../../../../icons/src/interface/IconChevronDown';
import DirectionalIcon from '../DirectionalIcon';

const ExpandableIcon = ({ expanded, size }) => {
  return expanded ? (
    <IconChevronDown decorative size={size} />
  ) : (
    <DirectionalIcon
      direction="right"
      right={IconChevronRight}
      left={IconChevronLeft}
      size={size}
      decorative
    />
  );
};

ExpandableIcon.propTypes = {
  expanded: _pt.bool.isRequired,
  size: _pt.oneOfType([_pt.string, _pt.number]),
};

ExpandableIcon.defaultProps = {
  size: 6,
};

export default ExpandableIcon;
