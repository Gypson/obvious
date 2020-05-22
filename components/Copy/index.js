import React from "react";
import _pt from "prop-types";
import copy from "copy-to-clipboard";
import IconCopy from "../../../../icons/src/interface/IconCopy";
import Tooltip from "../Tooltip";
import Link from "../Link";

const Copy = ({ children, text, onCopy, prompt, underlined }) => {
  const [copied, setCopied] = React.useState(false);

  const handleClick = (event) => {
    const result = copy(text);
    event.preventDefault();

    setCopied(true);

    if (onCopy) {
      onCopy(text, result);
    }
  };

  const handleMouseLeave = () => {
    window.setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  const element = children || (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link>
      <IconCopy decorative />
    </Link>
  );

  return (
    <Tooltip
      content={copied ? "Copied!" : "Copy to clipboard"}
      underlined={underlined}
      remainOnMouseDown
    >
      {React.cloneElement(element, {
        onClick: handleClick,
        onMouseLeave: handleMouseLeave,
      })}
    </Tooltip>
  );
};

Copy.propTypes = {
  children: _pt.node,
  text: _pt.string,
  onCopy: _pt.func,
  prompt: _pt.node,
  underlined: _pt.bool,
};

Copy.defaultProps = {
  children: null,
  onCopy: null,
  prompt: null,
  text: null,
  underlined: false,
};

export default Copy;
