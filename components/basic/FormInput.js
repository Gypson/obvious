import React from "react";
import _pt from "prop-types";
import { mutuallyExclusiveTrueProps } from "airbnb-prop-types";
import useStyles from "../../hooks/useStyles";
import buildInputStyles from "../../themes/buildInputStyles";

const sizingProp = mutuallyExclusiveTrueProps("small", "compact", "large");

const styleSheet = ({ ...props }) => {
  const styles = buildInputStyles(props);

  return {
    ...styles
  };
};

const FormInput = ({
  children,
  compact,
  disabled,
  hasPrefix,
  hasSuffix,
  hidden,
  id,
  important,
  invalid,
  large,
  noTranslate,
  optional,
  propagateRef,
  small,
  background,
  tagName: Tag,
  ...restProps
}) => {
  let [styles, cx] = useStyles(styleSheet);
  const isSelect = Tag === "select";
  const props = {
    ...restProps,
    className: cx(
      styles.input,
      (compact || small) && styles.input_compact,
      disabled && styles.input_disabled,
      hasPrefix && styles.input_hasPrefix,
      hasSuffix && styles.input_hasSuffix,
      hidden && styles.input_hidden,
      isSelect && styles.select,
      isSelect && compact && styles.select_compact,
      important && styles.input_important,
      invalid && styles.input_invalid,
      large && styles.input_large,
      background === "white" && styles.input_white
    ),
    disabled,
    id,
    required: !optional
  };

  // Only populate when invalid, otherwise it will break some CSS selectors
  if (invalid) {
    props["aria-invalid"] = true;
    props["aria-describedby"] = `${id}-error`;
  }

  // Cannot use chidren for input/textarea as they are void elements
  if (isSelect) {
    props.children = children;
  }

  // Add magical className to prevent Google Chrome translation
  if (noTranslate) {
    props.className += " notranslate";
  }

  return (
    <Tag
      {...props}
      ref={propagateRef}
      data-gramm="false"
      data-enable-grammarly="false"
      required={!optional}
    />
  );
};

FormInput.propTypes = {
  tagName: _pt.oneOf(["input", "select", "textarea"]).isRequired,
  hasSuffix: _pt.bool,
  hasPrefix: _pt.bool,
  children: _pt.node,
  value: _pt.oneOfType([_pt.string, _pt.number]),
  propagateRef: _pt.oneOfType([_pt.string, _pt.func, _pt.object]),
  optional: _pt.bool,
  noTranslate: _pt.bool,
  invalid: _pt.bool,
  important: _pt.bool,
  compact: sizingProp,
  disabled: _pt.bool,
  hidden: _pt.bool,
  id: _pt.any.isRequired,
  large: sizingProp,
  small: sizingProp
};

FormInput.defaultProps = {
  children: null,
  compact: false,
  disabled: false,
  hasPrefix: false,
  hasSuffix: false,
  hidden: false,
  important: false,
  invalid: false,
  large: false,
  noTranslate: false,
  optional: false,
  propagateRef: null,
  small: false,
  value: ""
};

export default FormInput;
