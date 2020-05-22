import React from 'react';
import _pt from 'prop-types';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';

const fractionProp = mutuallyExclusiveTrueProps('diagonal', 'stacked');

const getNumericVariant = props => {
  const variants = [];
  if (props.diagonal) {
    variants.push('diagonal-fractions');
  } else if (props.stacked) {
    variants.push('stacked-fractions');
  }

  if (props.ordinal) {
    variants.push('ordinal');
  }

  if (props.slashed) {
    variants.push('slashed-zero');
  }

  if (props.tabular) {
    variants.push('tabular-nums');
  }

  return variants.length > 0 ? variants.join(' ') : 'normal';
};

const Glyph = ({ children, ...props }) => {
  const [, cx] = useStyles(() => ({}));

  return <span className={cx({ fontVariantNumeric: getNumericVariant(props) })}>{children}</span>;
};

Glyph.propTypes = {
  tabular: _pt.bool,
  slashed: _pt.bool,
  ordinal: _pt.bool,
  children: _pt.any.isRequired,
  diagonal: fractionProp,
  stacked: fractionProp,
};

Glyph.defaultProps = {
  diagonal: false,
  ordinal: false,
  slashed: false,
  stacked: false,
  tabular: false,
};

export default Glyph;
