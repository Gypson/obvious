import React from 'react';
import _pt from 'prop-types';
import uuid from 'uuid/v4';
import useStyles from '../../hooks/useStyles';
import Item from './Item';

export { Item };

const styleSheet = ({ color }) => ({
  container: {
    background: color.accent.bg,
    borderBottom: '1px solid transparent',
    borderTop: '1px solid transparent',

    ':empty': {
      display: 'none',
    },
  },

  container_bordered: {
    borderBottomColor: color.accent.border,
  },
});

const Accordion = ({ bordered, children, defaultIndex }) => {
  const [styles, cx] = useStyles(styleSheet);
  const [id] = uuid();
  const [index, setIndex] = React.useState(defaultIndex || 0);
  const handleClick = index => {
    setIndex(prevState => (index === prevState ? -1 : index));
  };
  React.useEffect(() => {
    setIndex(defaultIndex);
  }, [defaultIndex]);

  return (
    <div className={cx(styles.container, bordered && styles.container_bordered)} role="tablist">
      {React.Children.map(children, (child, i) => {
        if (!child) {
          return null;
        }

        return React.cloneElement(child, {
          bordered,
          expanded: i === index,
          id: `${id}-${i}`,
          index: i,
          onClick: handleClick,
        });
      })}
    </div>
  );
};

Accordion.propTypes = {
  bordered: _pt.bool,
  children: _pt.any.isRequired,
  defaultIndex: _pt.number,
};

Accordion.defaultProps = {
  bordered: false,
  defaultIndex: 0,
};

export default Accordion;
