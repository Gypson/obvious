import React from "react";
import _pt from "prop-types";
import { Link } from "react-router-dom";
import removeFocusOnMouseUp from "../../utils/removeFocusOnMouseUp";
import IconAffix from "./IconAffix";

const ButtonOrLink = ({
  afterIcon,
  beforeIcon,
  children,
  disabled,
  flexAlign,
  href,
  loading,
  onClick,
  openInNewWindow,
  rel,
  type,
  external,
  download,
  ...props
}) => {
  const Tag = href ? (external ? "a" : Link) : "button";

  const handleClick = event => {
    if (disabled || !onClick) {
      // Causes React Router Link not to work
      // event.preventDefault();
    } else {
      onClick(event);
    }
  };

  const handleMouseUp = event => {
    removeFocusOnMouseUp(event);
  };

  if (href) {
    if (external) {
      props.href = href;
    } else {
      props.to = href;
    }
    props.rel = rel;
    props.onClick = handleClick;

    if (openInNewWindow) {
      props.target = "_blank";

      if (props.rel === undefined) {
        props.rel = "noopener noreferrer";
      }
    }
  } else {
    props.disabled = disabled || loading || false;
    props.type = type || "button";
    props.onClick = handleClick;
  }

  return (
    <Tag {...props} onMouseUp={handleMouseUp} download={download}>
      {!loading && beforeIcon && (
        <IconAffix before flex={flexAlign}>
          {beforeIcon}
        </IconAffix>
      )}

      {children}

      {!loading && afterIcon && (
        <IconAffix after flex={flexAlign}>
          {afterIcon}
        </IconAffix>
      )}
    </Tag>
  );
};

ButtonOrLink.propTypes = {
  afterIcon: _pt.node,
  beforeIcon: _pt.node,
  children: _pt.any.isRequired,
  disabled: _pt.bool,
  flexAlign: _pt.bool,
  href: _pt.string,
  loading: _pt.bool,
  onClick: _pt.func,
  openInNewWindow: _pt.bool,
  rel: _pt.string,
  type: _pt.oneOf(["button", "submit", "reset"]),
  className: _pt.string
};

ButtonOrLink.defaultProps = {
  afterIcon: null,
  beforeIcon: null,
  className: null,
  disabled: false,
  flexAlign: false,
  href: "",
  loading: false,
  onClick: null,
  openInNewWindow: false,
  type: "button"
};

export default ButtonOrLink;
