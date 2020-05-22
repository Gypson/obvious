import React, { useEffect, useState } from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import ScrollSectionContext from "./ScrollContext";

const styleSheet = ({ unit, color }) => ({
  wrapper: {
    height: "100%",
    position: "relative",
    overflowY: "auto"
  },
  scroller_top: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    pointerEvents: "none",
    "-webkit-box-shadow": "inset 0 18px 20px -18px rgba(17, 20, 50, 0.32)",
    boxShadow: "inset 0 18px 20px -18px rgba(17, 20, 50, 0.32)"
  },
  scroller_bottom: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    bottom: 0,
    pointerEvents: "none",
    "-webkit-box-shadow": "inset 0 -18px 20px -18px rgba(17, 20, 50, 0.32)",
    boxShadow: "inset 0 -18px 20px -18px rgba(17, 20, 50, 0.32)"
  },
  scroller_border: {
    marginTop: unit,
    marginBottom: unit,
    padding: 0,
    border: 0,
    height: 1,
    backgroundColor: color.core.neutral[1]
  }
});

const ScrollWrapper = ({
  children,
  intersectionMargin,
  intersectionThreshold,
  onChangeActiveScrollSection,
  onHideScrollSection
}) => {
  const [styles, cx] = useStyles(styleSheet);
  let anchors = new Map();
  let observer = null;
  let scrollContext = void 0;
  let scrollRef = React.createRef();
  const [scrollingTop, setScrollingTop] = useState(false);
  const [scrollingBottom, setScrollingBottom] = useState(false);

  const setupObserver = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    if (scrollRef.current) {
      observer = new IntersectionObserver(handleIntersect, {
        root: scrollRef.current,
        rootMargin: intersectionMargin,
        threshold: intersectionThreshold
      });
      anchors.forEach(anchor => {
        observer.observe(anchor);
      });
    }
  };

  const addScrollAnchor = (name, anchor) => {
    if ("production" !== process.env.NODE_ENV && anchors.has(name)) {
      throw new Error("Duplicate anchor id added: " + name);
    }
    if (observer) {
      observer.observe(anchor);
    }

    anchors.set(name, anchor);
  };

  const removeScrollAnchor = name => {
    if (!anchors.has(name)) {
      return;
    }

    if (observer) {
      observer.unobserve(anchors.get(name));
    }

    anchors.delete(name);
  };

  const handleIntersect = entries => {
    entries.forEach(_ref => {
      let { target, isIntersecting } = _ref;

      // isIntersecting is true if it has passed the threshold in a positive direction,
      // false if it is no longer intersecting, this is preferable to using intersectionRatio
      // as on small intersection areas, the ratio can lose precision wnough to be 0,
      // rather than a very small number.
      if (isIntersecting && onChangeActiveScrollSection) {
        onChangeActiveScrollSection(target.id);
      }

      if (!isIntersecting && onHideScrollSection) {
        onHideScrollSection(target.id);
      }
    });
  };

  const handleScroll = event => {
    const node = event.target;
    const position = node.scrollTop;
    const bottom = node.scrollHeight - node.scrollTop === node.clientHeight;
    if (position > 10) {
      setScrollingTop(true);
    } else {
      setScrollingTop(false);
    }
    if (bottom) {
      setScrollingBottom(false);
    } else {
      setScrollingBottom(true);
    }
  };

  useEffect(() => {
    const { current } = scrollRef;
    if (current) {
      setupObserver();
    }
    current.addEventListener("scroll", handleScroll);

    return () => {
      current.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setupObserver();
  }, [intersectionMargin]);

  if (!scrollContext) {
    scrollContext = {
      addScrollAnchor: addScrollAnchor,
      removeScrollAnchor: removeScrollAnchor
    };
  }

  return (
    <ScrollSectionContext.Provider value={scrollContext}>
      {scrollingTop && <div className={cx(styles.scroller_top)} />}
      <div ref={scrollRef} className={cx(styles.wrapper)}>
        {children}
      </div>
      {scrollingBottom ? (
        <div className={cx(styles.scroller_bottom)} />
      ) : (
        <hr className={cx(styles.scroller_border)} />
      )}
    </ScrollSectionContext.Provider>
  );
};

ScrollWrapper.propTypes = {
  children: _pt.any.isRequired,
  intersectionMargin: _pt.string,
  intersectionThreshold: _pt.number,
  onChangeActiveScrollSection: _pt.func,
  onHideScrollSection: _pt.func
};

ScrollWrapper.defaultProps = {
  intersectionMargin: "0% 0% -99% 0%",
  intersectionThreshold: null,
  onChangeActiveScrollSection: null,
  onHideScrollSection: null
};

export default ScrollWrapper;
