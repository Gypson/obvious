import React from 'react';
import _pt from 'prop-types';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import useStyles from '../../hooks/useStyles';

const dirProp = mutuallyExclusiveTrueProps('after', 'before');

const styleSheet = () => ({});

const BaseAffix = ({ after, before, children, compact, disabled, flex, override }) => {
  let [styles, cx] = useStyles(styleSheet);
  styles = override ? override : styles;

  return (
    <div
      className={cx(
        styles.affix,
        compact && styles.affix_compact,
        before && styles.affix_before,
        after && styles.affix_after,
        disabled && styles.affix_disabled,
        flex && styles.affix_flex,
      )}
    >
      {children}
    </div>
  );
};

BaseAffix.propTypes = {
  after: dirProp,
  before: dirProp,
  children: _pt.node.isRequired,
  compact: _pt.bool,
  disabled: _pt.bool,
  flex: _pt.bool,
  override: _pt.object,
};

BaseAffix.defaultProps = {
  after: false,
  before: false,
  compact: false,
  disabled: false,
  flex: false,
  override: null,
};

export default React.memo(BaseAffix);
