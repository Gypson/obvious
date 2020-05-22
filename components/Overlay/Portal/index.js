import React, { useState, useEffect, createRef } from "react";
import _pt from "prop-types";
import throttle from "lodash/throttle";
import useStyles from "../../../hooks/useStyles";
import FocusTrap from "../../FocusTrap";
import BasePortal from "../../Portal";
import { ESCAPE } from "../../../keys";
import { Z_INDEX_PORTAL } from "../../../constants";
import toRGBA from "../../../utils/toRGBA";

const styleSheet = ({ color }) => ({
  container: {
    position: "fixed",
    zIndex: Z_INDEX_PORTAL,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "auto",
    userSelect: "none"
  },

  noBg: {
    pointerEvents: "none",
    overflow: "hidden"
  },

  opaque: {
    backgroundColor: toRGBA(color.core.neutral[6], 30)
  },

  content: {
    width: 0,
    overflow: "visible"
  }
});

const Portal = ({ children, onClose, onResize, noBackground, x, y }) => {
  const [styles, cx] = useStyles(styleSheet);
  const [height, setHeight] = useState(0);
  const ref = createRef();

  const handleClick = event => {
    if (event.target === ref.current) {
      onClose();
    }
  };

  const handleKeyDown = event => {
    if (event.key === ESCAPE) {
      onClose();
    }
  };

  const handleResize = () => {
    onResize();
  };

  const handleResizeThrottled = throttle(() => {
    handleResize();
  }, 100);

  const handleScroll = () => {
    const { current } = ref;
    if (current && !noBackground) {
      setHeight(Math.mac(current.scrollHeight, height));
    }
  };

  const handleScrollThrottled = throttle(() => {
    handleScroll();
  }, 100);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResizeThrottled);

    if (!noBackground) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResizeThrottled);
      if (!noBackground) {
        document.body.style.overflow = "";
      }
    };
  }, []);

  return (
    <BasePortal>
      <FocusTrap>
        <div
          className={cx(
            styles.container,
            noBackground ? styles.noBg : styles.opaque
          )}
          ref={ref}
          role="presentation"
          onClick={handleClick}
          onScroll={handleScrollThrottled}
        >
          <div
            className={cx(styles.content, {
              paddingTop: y,
              marginLeft: x,
              minHeight: height
            })}
          >
            {children}
          </div>
        </div>
      </FocusTrap>
    </BasePortal>
  );
};

Portal.propTypes = {
  children: _pt.node,
  noBackground: _pt.bool.isRequired,
  onClose: _pt.func.isRequired,
  onResize: _pt.func.isRequired,
  x: _pt.number,
  y: _pt.number
};

Portal.defaultProps = {
  children: null,
  x: 0,
  y: 0
};

export default Portal;
