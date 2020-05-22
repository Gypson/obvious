import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import useTheme from '../../hooks/useTheme';

const styleSheet = ({ color, font }) => ({
  group: {
    display: 'flex',
    alignItems: 'stretch',
  },

  cell: {
    borderRadius: '50%',
    border: `1px solid ${color.base}`,
    background: color.core.neutral[6],

    ':first-of-type': {
      marginLeft: 0,
    },

    ':empty': {
      display: 'none',
    },
  },

  remainder: {
    ...font.textRegular,
    position: 'relative',
  },

  remainderNumber: {
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    color: color.base,
  },
});

const ProfilePhotoGroup = ({ max, size, children }) => {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();
  const { unit } = theme;

  const margin = { marginLeft: -(size * (unit / 2.5)) };
  let photos = React.Children.toArray(children).filter(child => !!child);
  let remainder = 0;

  if (max && photos.length > max) {
    remainder = photos.length - max;
    photos = photos.slice(0, max);
  }

  return (
    <div className={cx(styles.group)}>
      {photos.map((photo, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className={cx(styles.cell, margin)}>
          {React.cloneElement(photo, {
            size,
            inline: false,
            square: false,
          })}
        </div>
      ))}

      {remainder > 0 && (
        <div key="remainder" className={cx(styles.cell, margin)}>
          <div
            className={cx(styles.remainder, {
              height: size * unit,
              maxHeight: size * unit,
              maxWidth: size * unit,
              width: size * unit,
            })}
          >
            <span className={cx(styles.remainderNumber)}>{`+${remainder}`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

ProfilePhotoGroup.propTypes = {
  children: _pt.node.isRequired,
  max: _pt.number,
  size: _pt.number,
};

ProfilePhotoGroup.defaultProps = {
  max: 3,
  size: 5,
};

export default ProfilePhotoGroup;
