import React, { createRef } from "react";
import _pt from "prop-types";
import { TAB } from "../../keys";
import focusableSelector from "../../utils/focusableSelector";

const FocusTrap = ({ children, disabled }) => {
  const nodeRef = createRef();
  const handleKeyDown = event => {
    if (disabled || event.key !== TAB) return;

    const focusableElements = getFocusableElements();

    if (focusableElements.length === 0 || !document.activeElement) return;

    let focusIndex = focusableElements.indexOf(document.activeElement);
    const initialIndex = focusIndex;

    do {
      if (event.shiftKey) {
        if (focusIndex < 1) {
          focusIndex = focusableElements.length - 1;
        } else {
          focusIndex -= 1;
        }
      } else if (focusIndex === focusableElements.length - 1) {
        focusIndex = 0;
      } else {
        focusIndex += 1;
      }

      const element = focusableElements[focusIndex];

      if (element) {
        element.focus();
      }

      if (focusIndex === initialIndex) {
        break;
      }
    } while (document.activeElement !== focusableElements[focusIndex]);

    event.preventDefault();
  };

  const getFocusableElements = () => {
    if (!nodeRef.current) {
      return [];
    }

    return Array.from(nodeRef.current.querySelectorAll(focusableSelector));
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div ref={nodeRef} onKeyDown={handleKeyDown}>
      {children}
    </div>
  );
};

FocusTrap.propTypes = {
  children: _pt.any.isRequired,
  disabled: _pt.bool
};

FocusTrap.defaultProps = {
  disabled: false
};

export default FocusTrap;
