import React from 'react';
import _pt from 'prop-types';
import Text from '../Text';
import useStyles from '../../hooks/useStyles';

const styleSheet = ({ ui }) => ({
  rule: {
    borderBottom: ui.border,
  },
});

const LabeledDivider = ({ label }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.rule)}>
      <Text small bold inline>
        {label}
      </Text>
    </div>
  );
};

LabeledDivider.propTypes = {
  label: _pt.node.isRequired,
};

export default LabeledDivider;
