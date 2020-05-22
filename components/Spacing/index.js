import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import { Size } from '../../types';

const cleanClassName = className => {
  if (className) {
    return className.toString().replace('.', 'dot');
  }
};

const styleSheet = ({ unit }) => {
  const spacing = [];

  for (let i = 0; i <= 12; i += 0.5) {
    const size = unit * i;

    ['Top', 'Right', 'Bottom', 'Left'].forEach(side => {
      const cleaned = cleanClassName(i);
      spacing[`outer${side}_${cleaned}`] = { [`margin${side}`]: size };
      spacing[`inner${side}_${cleaned}`] = { [`padding${side}`]: size };
    });
  }

  return {
    ...spacing,

    spacing_inline: {
      display: 'inline-block',
    },
  };
};

const Spacing = ({
  all,
  bottom,
  children,
  horizontal,
  left,
  tag: TagProp = 'div',
  top,
  inline,
  inner,
  right,
  vertical,
}) => {
  const [styles, cx] = useStyles(styleSheet);

  const type = inner ? 'inner' : 'outer';
  const classes = [];

  if (all) {
    const cleaned = cleanClassName(all);
    classes.push(
      styles[`${type}Top_${cleaned}`],
      styles[`${type}Right_${cleaned}`],
      styles[`${type}Bottom_${cleaned}`],
      styles[`${type}Left_${cleaned}`],
    );
  } else {
    if (vertical) {
      const cleaned = cleanClassName(vertical);
      classes.push(styles[`${type}Top_${cleaned}`], styles[`${type}Bottom_${cleaned}`]);
    } else {
      if (top) {
        const cleaned = cleanClassName(top);
        classes.push(styles[`${type}Top_${cleaned}`]);
      }

      if (bottom) {
        const cleaned = cleanClassName(bottom);
        classes.push(styles[`${type}Bottom_${cleaned}`]);
      }
    }

    if (horizontal) {
      const cleaned = cleanClassName(horizontal);
      classes.push(styles[`${type}Left_${cleaned}`], styles[`${type}Right_${cleaned}`]);
    } else {
      if (left) {
        const cleaned = cleanClassName(left);
        classes.push(styles[`${type}Left_${cleaned}`]);
      }

      if (right) {
        const cleaned = cleanClassName(right);
        classes.push(styles[`${type}Right_${cleaned}`]);
      }
    }
  }

  return <TagProp className={cx(...classes, inline && styles.spacing_inline)}>{children}</TagProp>;
};

Spacing.propTypes = {
  all: Size,
  bottom: Size,
  children: _pt.any.isRequired,
  horizontal: Size,
  inline: _pt.bool,
  inner: _pt.bool,
  left: Size,
  right: Size,
  tag: _pt.oneOf(['article', 'div', 'footer', 'header', 'section']),
  top: Size,
  vertical: Size,
};

Spacing.defaultProps = {
  all: null,
  bottom: null,
  horizontal: null,
  inline: false,
  inner: false,
  left: null,
  right: null,
  tag: 'div',
  top: null,
  vertical: null,
};

export default Spacing;
