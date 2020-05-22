import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import ProgressBar from '../ProgressBar';
import Tooltip from '../Tooltip';

const styleSheet = () => ({
  step: {
    flexGrow: 1,
    marginRight: 2,

    ':last-child': {
      marginRight: 0,
    },

    '@selectors': {
      // Fix tooltips mixed with flexbox
      '> *': {
        display: 'block',
        width: '100%',
      },
    },
  },
});

const Step = ({ complete, first, last, label }) => {
  const [styles, cx] = useStyles(styleSheet);
  const bar = (
    <ProgressBar
      leading={first || (!first && !last)}
      trailing={last || (!first && !last)}
      percent={complete ? 100 : 0}
    />
  );

  return (
    <div className={cx(styles.step)}>{label ? <Tooltip content={label}>{bar}</Tooltip> : bar}</div>
  );
};

Step.propTypes = {
  complete: _pt.bool,
  first: _pt.bool,
  label: _pt.node,
  last: _pt.bool,
};

Step.defaultProps = {
  complete: false,
  first: false,
  label: null,
  last: false,
};

export default Step;
