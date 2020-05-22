import React from 'react';
import _pt from 'prop-types';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import IconChevronLeft from '../../../../icons/src/interface/IconChevronLeft';
import IconChevronRight from '../../../../icons/src/interface/IconChevronRight';
import useStyles from '../../hooks/useStyles';
import DirectionalIcon from '../DirectionalIcon';

const styleSheet = ({ unit, transition, ui, pattern, color }) => {
  const scrollbarHeight = unit * 1.5;

  const gradient = {
    ...transition.fade,
    position: 'absolute',
    top: 0,
    bottom: 0,
    zIndex: 1,
    content: "''",
    opacity: 0,
    pointerEvents: 'none',
  };

  const arrow = {
    ...pattern.resetButton,
    position: 'absolute',
    top: '45%',
    marginTop: -scrollbarHeight / 2,
    transform: 'translateY(-50%)',
    backgroundColor: color.accent.bg,
    borderRadius: '50%',
    boxShadow: ui.boxShadow,
    padding: unit,
    outline: 'none',

    ':hover': {
      backgroundColor: color.accent.bgHover,
    },
  };

  return {
    container: {
      width: '100%',
      position: 'relative',
      margin: -unit / 2,
    },

    leftGradient: {
      ...gradient,
      width: unit * 5,
      left: 0,
      background: `linear-gradient(to right, ${color.accent.bg} 40%, transparent 100%)`,
    },

    leftArrow: {
      ...arrow,
      left: -unit,
    },

    rightGradient: {
      ...gradient,
      width: unit * 5,
      right: 0,
      background: `linear-gradient(to left, ${color.accent.bg} 40%, transparent 100%)`,
    },

    rightArrow: {
      ...arrow,
      right: -unit,
    },

    arrow_hideScrollbar: {
      top: '45%',
      marginTop: 0,
    },

    gradient_reveal: {
      opacity: 1,
      pointerEvents: 'auto',
    },

    scroller: {
      overflowX: 'auto',
      overflowY: 'hidden',
      display: 'flex',
      alignItems: 'center',
      alignContent: 'stretch',
      paddingBottom: scrollbarHeight,
      '-webkit-overflow-scrolling': 'touch',
    },

    scroller_hideScrollbar: {
      paddingBottom: 0,

      '::-webkit-scrollbar': {
        display: 'none',
      },
    },

    scrollTrigger: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    contents: {
      flexBasis: '100%',
      padding: unit / 2,
    },
  };
};

const INCREMENT = 25;

const GradientScroller = ({ autoScrollIncrement, children, hideScrollbar, showArrows }) => {
  const [showStartGradient, setShowStartGradient] = React.useState(false);
  const [showEndGradient, setShowEndGradient] = React.useState(true);

  let contentsRef = null;
  let observer;
  let scrollInterval = 0;
  let scrollerRef = null;

  React.useEffect(() => {
    observer = new window.ResizeObserver(handleObserver);

    return () => {
      observer.disconnect();
    };
  }, []);

  const calculate = () => {
    const scroller = scrollerRef;
    const contents = contentsRef;

    if (!scroller || !contents) {
      return;
    }

    const scrollerWidth = scroller.clientWidth;
    const maxChildWidth = calculateMaxChildWidth(contents);

    setShowStartGradient(scroller.scrollLeft > 0);
    setShowEndGradient(maxChildWidth > scrollerWidth);
  };

  const calculateAutoScrollIncrement = () => {
    let increment = autoScrollIncrement;

    // 15% of the width
    if (!increment && scrollerRef) {
      increment = scrollerRef.offsetWidth * 0.15;
    }

    if (!increment) {
      increment = INCREMENT;
    }

    return increment;
  };

  const calculateMaxChildWidth = contents => {
    return Array.from(contents.children).reduce(
      (width, child) => Math.max(child.clientWidth, width),
      contents.clientWidth,
    );
  };

  const doScroll = (amount, interval = true) => {
    const callback = () => {
      if (scrollerRef) {
        scrollerRef.scrollLeft += amount;
        handleScrollThrottled();
      }
    };

    handleScrollStop();

    if (interval) {
      scrollInterval = window.setInterval(callback, 100);
    } else {
      callback();
    }
  };

  const handleContentsRef = ref => {
    if (ref && observer) {
      observer.observe(ref);
    } else if (contentsRef && observer) {
      observer.unobserve(contentsRef);
    }

    contentsRef = ref;
  };

  const handleScrollerRef = ref => {
    if (ref && observer) {
      observer.observe(ref);
    } else if (scrollerRef && observer) {
      observer.unobserve(scrollerRef);
    }

    scrollerRef = ref;
  };

  const handleObserver = entries => {
    let calculate = false;

    entries.forEach(({ contentRect, target }) => {
      const width = target.dataset.prevWidth;
      const nextWidth = String(contentRect.width);

      // Dataset stores as strings
      if (!width || nextWidth !== width) {
        calculate = true;

        // eslint-disable-next-line no-param-reassign
        target.dataset.prevWidth = nextWidth;
      }
    });

    if (calculate) {
      handleResizeDebounced();
    }
  };

  const handleResize = () => {
    calculate();
  };

  const handleResizeDebounced = debounce(handleResize, 150);

  const handleScroll = () => {
    const target = scrollerRef;

    if (!target) {
      return;
    }

    if (target.scrollLeft > 0 && !showStartGradient) {
      setShowStartGradient(true);
    } else if (target.scrollLeft === 0 && showStartGradient) {
      setShowStartGradient(false);
    }

    // Get the largest width child to calculate against
    const scrolledWidth = target.scrollLeft + target.clientWidth;
    const maxChildWidth = calculateMaxChildWidth(target.children[0]);

    if (scrolledWidth < maxChildWidth && !showEndGradient) {
      setShowEndGradient(true);
    } else if (scrolledWidth >= maxChildWidth && showEndGradient) {
      setShowEndGradient(false);
    }
  };

  const handleScrollThrottled = throttle(handleScroll, 100);

  const handleScrollLeft = event => {
    doScroll(-calculateAutoScrollIncrement(), event.type !== 'click');
  };

  const handleScrollRight = event => {
    doScroll(calculateAutoScrollIncrement(), event.type !== 'click');
  };

  const handleScrollStop = () => {
    if (scrollInterval) {
      window.clearInterval(scrollInterval);
    }
  };

  const [styles, cx] = useStyles(styleSheet);

  return (
    <div className={cx(styles.container)}>
      <div className={cx(styles.leftGradient, showStartGradient && styles.gradient_reveal)}>
        {showArrows ? (
          <button
            className={cx(styles.leftArrow, hideScrollbar && styles.arrow_hideScrollbar)}
            type="button"
            onClick={handleScrollLeft}
          >
            <DirectionalIcon
              direction="left"
              left={IconChevronLeft}
              right={IconChevronRight}
              size="2em"
              decorative
            />
          </button>
        ) : (
          <span
            className={cx(styles.scrollTrigger)}
            onMouseEnter={handleScrollLeft}
            onMouseLeave={handleScrollStop}
          />
        )}
      </div>

      <div className={cx(styles.rightGradient, showEndGradient && styles.gradient_reveal)}>
        {showArrows ? (
          <button
            className={cx(styles.rightArrow, hideScrollbar && styles.arrow_hideScrollbar)}
            type="button"
            onClick={handleScrollRight}
          >
            <DirectionalIcon
              direction="right"
              left={IconChevronLeft}
              right={IconChevronRight}
              size="2em"
              decorative
            />
          </button>
        ) : (
          <span
            className={cx(styles.scrollTrigger)}
            onMouseEnter={handleScrollRight}
            onMouseLeave={handleScrollStop}
          />
        )}
      </div>

      <div
        className={cx(styles.scroller, hideScrollbar && styles.scroller_hideScrollbar)}
        ref={handleScrollerRef}
        onScroll={handleScrollThrottled}
      >
        <div className={cx(styles.contents)} ref={handleContentsRef}>
          {children}
        </div>
      </div>
    </div>
  );
};

GradientScroller.propTypes = {
  autoScrollIncrement: _pt.number,
  children: _pt.node,
  hideScrollbar: _pt.bool,
  showArrows: _pt.bool,
};
GradientScroller.defaultProps = {
  autoScrollIncrement: null,
  children: null,
  hideScrollbar: false,
  showArrows: false,
};

export default GradientScroller;
