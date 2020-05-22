import React from 'react';
import _pt from 'prop-types';
import useStyles from '../../hooks/useStyles';
import useTheme from '../../hooks/useTheme';
import ExpandableIcon from '../ExpandableIcon';

const styleSheet = ({ color, pattern, ui, unit }) => ({
  body: {
    display: 'none',
    padding: `${unit}px ${unit * 2}px ${unit * 2}px`,
  },

  body_expanded: {
    display: 'block',
  },

  item: {
    background: color.accent.bg,
  },

  item_bordered: {
    borderTop: ui.border,
  },

  title: {
    ...pattern.resetButton,
    display: 'flex',
    alignItems: 'center',
    padding: unit * 2,
    textAlign: 'left',
    width: '100%',
  },

  titleText: {
    flex: '1',
  },
});

const AccordionItem = ({ bordered, children, expanded, id, index, title, onClick }) => {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();

  const handleClick = () => {
    if (onClick) {
      onClick(index);
    }
  };

  return (
    <div className={cx(styles.item, bordered && styles.item_bordered)}>
      <button
        className={cx(styles.title)}
        aria-controls={`accordion-body-${id}`}
        aria-selected={expanded}
        id={`accordion-title-${id}`}
        onClick={handleClick}
        role="tab"
        tabIndex={0}
        type="button"
      >
        {title && <span className={cx(styles.titleText)}>{title}</span>}

        <ExpandableIcon expanded={!!expanded} size={theme.unit * 3} />
      </button>

      <section
        className={cx(styles.body, expanded && styles.body_expanded)}
        aria-hidden={!expanded}
        aria-labelledby={`accordion-title-${id}`}
        id={`accordion-body-${id}`}
        role="tabpanel"
      >
        {children}
      </section>
    </div>
  );
};

AccordionItem.propTypes = {
  bordered: _pt.bool,
  children: _pt.node,
  expanded: _pt.bool,
  id: _pt.string.isRequired,
  index: _pt.number,
  title: _pt.node,
  onClick: _pt.func,
};

AccordionItem.defaultProps = {
  bordered: false,
  children: null,
  expanded: false,
  index: null,
  onClick: null,
  title: null,
};

export default AccordionItem;
