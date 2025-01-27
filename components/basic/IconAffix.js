import React from 'react';
import useStyles from '../../hooks/useStyles';
import BaseAffix from './BaseAffix';

const styleSheet = ({ pattern, unit }) => ({
  affix: {
    display: 'inline-block',
    verticalAlign: 'middle',
    // The icon doesn't align perfectly in the middle unless the parent is flex,
    // but most (if not all) parents are inline-block, so we need to bump it up a few pixels.
    marginTop: -(unit / 3.25),
  },

  affix_after: {
    marginLeft: unit,
  },

  affix_before: {
    marginRight: unit,
  },

  affix_disabled: {
    ...pattern.disabled,
  },

  affix_flex: {
    flexShrink: 0,
    flexGrow: 0,
    marginTop: 0,
  },
});

const IconAffix = ({ ...props }) => {
  const [styles] = useStyles(styleSheet);

  return <BaseAffix override={styles} {...props} />;
};

export default IconAffix;
