import React from 'react';
import _pt from 'prop-types';
import ScrollWrapper from './ScrollWrapper';
import ScrollSectionContext from './ScrollContext';

export { ScrollWrapper, ScrollSectionContext };

const InternalScrollSection = ({ ...props }) => {
  const handleRef = ref => {
    const { id, scrollContext } = props;

    scrollContext.removeScrollAnchor(id);

    if (ref) {
      scrollContext.addScrollAnchor(id, ref);
    }
  };

  const { children, id } = props;

  return (
    <section id={id} ref={handleRef}>
      {children}
    </section>
  );
};

InternalScrollSection.propTypes = {
  id: _pt.string.isRequired,
  children: _pt.any.isRequired,
  scrollContext: _pt.any.isRequired,
};

const ScrollSection = ({ ...props }) => {
  return (
    <ScrollSectionContext.Consumer>
      {scrollContext =>
        scrollContext && <InternalScrollSection {...props} scrollContext={scrollContext} />
      }
    </ScrollSectionContext.Consumer>
  );
};

ScrollSection.propTypes = {
  id: _pt.string.isRequired,
  children: _pt.any.isRequired,
};

export default ScrollSection;
