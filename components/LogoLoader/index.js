import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';

const styleSheet = ({ color }) => ({
  loader: {
    margin: '0 auto',
    textAlign: 'center',
  },

  loader_absolute: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateX(-50%) translateY(-50%)',
  },

  loader_inline: {
    display: 'inline-block',
  },

  loader_circle: {
    width: 50,
    height: 50,
    borderRadius: '100%',
    border: '10px solid',
    borderColor: color.core.primary[3],
    backgroundColor: 'transparent',
    animationName: {
      name: 'sk-rotateoplane',
      '0%': {
        transform: 'perspective(120px) rotateX(0deg) rotateY(0deg)',
        '-webkit-transform': 'perspective(120px) rotateX(0deg) rotateY(0deg)',
      },
      '50%': {
        '-webkit-transform': 'perspective(120px) rotateX(-180.1deg) rotateY(0deg)',
      },
      '100%': {
        transform: 'perspective(120px) rotateX(-180deg) rotateY(-179.9deg)',
        '-webkit-transform': 'perspective(120px) rotateX(-180deg) rotateY(-179.9deg)',
      },
    },
    animationDuration: '1.2s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'ease-in-out',
    animationFillMode: 'both',
  },
});

const LogoLoader = ({ inline, static: isStatic }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div
      className={cx(
        styles.loader,
        inline && styles.loader_inline,
        !isStatic && !inline && styles.loader_absolute,
      )}
    >
      <div className={cx(styles.loader_circle)} />
    </div>
  );
};

LogoLoader.propTypes = {
  inline: _pt.bool,
  static: _pt.bool,
};

LogoLoader.defaultProps = {
  inline: false,
  static: false,
};

export default LogoLoader;
