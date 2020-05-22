import React, { useEffect } from "react";
import _pt from "prop-types";
import { mutuallyExclusiveProps } from "airbnb-prop-types";
import useStyles from "../../hooks/useStyles";

const PositionShape = _pt.oneOfType([
  _pt.number.isRequired,
  _pt.string.isRequired
]);
const leftRightProp = mutuallyExclusiveProps(PositionShape, "left", "right");
const topBottomProp = mutuallyExclusiveProps(PositionShape, "top", "bottom");

const styleSheet = () => ({});

// eslint-disable-next-line react/display-name
const Dropdown = ({
  fixed,
  children,
  onBlur,
  onFocus,
  zIndex,
  visible,
  onClickOutside,
  full,
  offset,
  maxHeight,
  ...props
}) => {
  const [, cx] = useStyles(styleSheet);
  const ref = React.createRef();

  const handleClickOutside = event => {
    const { current } = ref;
    if (current && current.contains(event.target)) return;
    if (onClickOutside) onClickOutside(event);
  };

  useEffect(() => {
    if (visible) document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (visible) {
      document.addEventListener("click", handleClickOutside, true);
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const style = {
    position: fixed ? "fixed" : "absolute",
    overflowY: "auto",
    zIndex: zIndex || "auto",
    width: full ? "100%" : "auto",
    ...props
  };

  // Set top by default if neither are defined
  if (!("bottom" in props) && !("top" in props)) {
    style.top = "100%";
  }

  // Set left by default if neither are defined
  if (!("left" in props) && !("right" in props)) {
    style.left = 0;
  }

  if (offset) {
    if (offset === "left") style.marginLeft = 10;
    if (offset === "right") style.marginRight = 10;
    if (offset === "top") style.marginTop = 10;
    if (offset === "bottom") style.marginBottom = 10;
  }

  if (maxHeight) style.maxHeight = maxHeight;

  return (
    <div ref={ref} className={cx(style)} onBlur={onBlur} onFocus={onFocus}>
      {children}
    </div>
  );
};

Dropdown.propTypes = {
  zIndex: _pt.oneOfType([_pt.number, _pt.oneOf(["auto"])]),
  visible: _pt.bool,
  onFocus: _pt.func,
  onClickOutside: _pt.func,
  onBlur: _pt.func,
  fixed: _pt.bool,
  children: _pt.any.isRequired,
  bottom: topBottomProp,
  left: leftRightProp,
  right: leftRightProp,
  top: topBottomProp,
  full: _pt.bool,
  offset: _pt.oneOf(["left", "right", "top", "bottom"]),
  maxHeight: _pt.oneOfType([_pt.number, _pt.oneOf(["auto"])])
};

Dropdown.defaultProps = {
  bottom: null,
  fixed: false,
  full: false,
  left: null,
  maxHeight: "auto",
  offset: null,
  onBlur: null,
  onClickOutside: null,
  onFocus: null,
  right: null,
  top: null,
  visible: false,
  zIndex: "auto"
};

export default React.memo(Dropdown);
