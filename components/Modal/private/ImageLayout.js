import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../../hooks/useStyles';

const styleSheet = ({ responsive, ui, unit }) => ({
  splitContent: {
    display: 'flex',
  },

  splitContentPane: {
    flex: '1',
  },

  splitContentImagePane: {
    borderLeft: ui.border,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',

    '@media': {
      [responsive.xsmall]: {
        display: 'none',
      },
    },
  },

  image: {
    display: 'block',
    objectFit: 'contain',
    maxWidth: '100%',
    maxHeight: '100%',
    margin: unit * 3,
  },

  imageCover: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
    margin: 0,
  },
});

export const MAX_HEIGHT_IMAGE = 720;
export const MAX_HEIGHT_IMAGE_SMALL = 420;

const ModalImageLayout = ({ children, sizes, srcSet, type, url }) => {
  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.splitContent)}>
      <div className={cx(styles.splitContentPane)}>{children}</div>
      <div className={cx(styles.splitContentPane, styles.splitContentImagePane)}>
        {type === 'center' && (
          <img
            className={cx(styles.image)}
            src={url}
            srcSet={srcSet && srcSet.join(',')}
            sizes={sizes && sizes.join(',')}
            alt=""
          />
        )}

        {type === 'cover' && (
          <img
            className={cx(styles.image, styles.imageCover)}
            src={url}
            srcSet={srcSet && srcSet.join(',')}
            alt=""
          />
        )}
      </div>
    </div>
  );
};

ModalImageLayout.propTypes = {
  children: _pt.node.isRequired,
  sizes: _pt.string,
  srcSet: _pt.string,
  type: _pt.string,
  url: _pt.string,
};

ModalImageLayout.defaultProps = {
  sizes: null,
  srcSet: null,
  type: null,
  url: null,
};

export default ModalImageLayout;
