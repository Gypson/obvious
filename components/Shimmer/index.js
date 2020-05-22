import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';

const styleSheet = () => ({
  shimmer: {
    animationDirection: 'alternate',
    animationDuration: '1s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationName: {
      name: 'shimmer',
      from: { opacity: 0.1 },
      to: { opacity: 0.3 },
    },
    animationTimingFunction: 'ease-in-out',
    backgroundColor: 'currentColor',
    display: 'inline-block',
    position: 'relative',
    verticalAlign: 'middle',
  },

  shimmer_block: {
    display: 'block',
  },
});

const Shimmer = ({ block, height, radius, width }) => {
  const [styles, cx] = useStyles(styleSheet);

  const randomWidth = width === 'random' ? `${Math.round(Math.random() * (90 - 30) + 30)}%` : '';

  return (
    <span
      aria-busy="true"
      style={{
        borderRadius: radius,
        width: randomWidth || width,
        height,
      }}
      className={cx(styles.shimmer, block && styles.shimmer_block)}
    />
  );
};

Shimmer.propTypes = {
  block: _pt.bool,
  height: _pt.oneOfType([_pt.number, _pt.string]),
  width: _pt.oneOfType([_pt.number, _pt.string]),
  radius: _pt.string,
};

Shimmer.defaultProps = {
  block: false,
  height: '1.25ex',
  radius: '0.125em',
  width: '60%',
};

export default Shimmer;
