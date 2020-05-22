import React from "react";
import _pt from "prop-types";
import FormInput from "./FormInput";
import passThroughRef from "../../utils/passThroughRef";

const BaseTextArea = ({
  autoResize,
  maxHeight,
  minHeight,
  propagateRef,
  onChange,
  value,
  ...props
}) => {
  let textareaRef = null;
  let reflowRaf = null;

  React.useEffect(() => {
    reflowTextarea();

    return () => {
      if (reflowRaf) {
        window.cancelAnimationFrame(reflowRaf);
      }
    };
  }, []);

  React.useEffect(() => {
    reflowRaf = window.requestAnimationFrame(reflowTextarea);
  }, [value]);

  const reflowTextarea = () => {
    reflowRaf = null;

    const ref = textareaRef;

    if (!ref || !autoResize) {
      return;
    }

    // Fixed height is set when using the manual browser resizer (bottom right corner)
    const { height } = ref.style;
    const hasBeenResizedManually = height && height !== "auto";

    // Set heights to auto so that we can calculate the full height of the content
    ref.style.minHeight = "auto";
    ref.style.height = "auto";

    // Determine the next height by clamping our boundaries
    const newMinHeight = `${Math.max(
      minHeight,
      Math.min(ref.scrollHeight, maxHeight)
    )}px`;

    // If it has been manually resized outside our max, use that fixed height instead
    const newHeight =
      hasBeenResizedManually && height && parseFloat(height) > maxHeight
        ? height
        : "auto";

    // Set the new heights
    ref.style.minHeight = newMinHeight;
    ref.style.height = newHeight;
  };

  const handleChange = event => {
    onChange(event.currentTarget.value, event);
  };

  const loadRef = ref => {
    textareaRef = ref;

    if (ref) {
      reflowTextarea();
    }

    passThroughRef(propagateRef, ref);
  };

  return (
    <FormInput
      {...props}
      value={value}
      onChange={handleChange}
      propagateRef={loadRef}
      tagName="textarea"
    />
  );
};

BaseTextArea.propTypes = {
  autoResize: _pt.bool,
  maxHeight: _pt.number,
  minHeight: _pt.number,
  maxLength: _pt.number,
  onChange: _pt.func,
  propagateRef: _pt.any,
  rows: _pt.number,
  value: _pt.string
};

BaseTextArea.defaultProps = {
  autoResize: false,
  maxHeight: 400,
  maxLength: null,
  minHeight: 125,
  onChange: null,
  propagateRef: null,
  rows: 3,
  value: ""
};

export default BaseTextArea;
