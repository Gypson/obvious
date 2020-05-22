import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import Text from "../Text";
import StatusText from "../StatusText";
import FormErrorMessage from "../FormErrorMessage";
import partitionFieldProps from "./partitionFieldProps";
import Prefix from "./Prefix";
import Suffix from "./Suffix";

const styleSheet = ({ unit }) => ({
  field: {
    marginBottom: unit * 3,

    "@selectors": {
      ":last-child, :only-child": {
        marginBottom: 0,
      },
    },
  },

  field_compactSpacing: {
    marginBottom: unit * 2,
  },

  field_noSpacing: {
    margin: 0,
  },

  content_inline: {
    display: "flex",
    alignItems: "center",
  },

  content_topAlign: {
    alignItems: "flext-start",
  },

  label: {
    margin: 0,
    marginBottom: unit,
    display: "block",
    flexGrow: 0,
  },

  label_stretch: {
    flexBasis: "100%",
  },

  label_hidden: {
    display: "none",
  },

  label_noSpacing: {
    margin: 0,
  },

  optional: {
    marginLeft: unit,
    display: "inline-block",
  },

  input: {
    display: "flex",
    position: "relative",
    flexGrow: 1,
  },

  input_fullWidth: {
    width: "100%",
  },

  input_beforeInline: {
    marginRight: unit,
  },

  input_afterInline: {
    marginLeft: unit,
  },

  input_hideLabel: {
    margin: 0,
  },

  affix: {
    flexGrow: 0,
  },

  anchor: {
    flexGrow: 1,
  },
});

const FormField = ({
  children,
  compact,
  compactSpacing,
  disabled,
  errorMessage,
  hideLabel,
  hideOptionalLabel,
  id,
  inline,
  invalid,
  label,
  labelDescription,
  noSpacing,
  optional,
  renderBeforeLabel,
  renderFullWidth,
  renderLargeLabel,
  stretchLabel,
  prefix,
  suffix,
  topAlign,
}) => {
  const [styles, cx] = useStyles(styleSheet);

  const content = (
    <div
      className={cx(
        styles.input,
        inline && renderBeforeLabel && styles.input_beforeInline,
        inline && !renderBeforeLabel && styles.input_afterInline,
        hideLabel && styles.input_hideLabel,
        renderFullWidth && styles.input_fullWidth
      )}
    >
      {prefix && <div className={cx(styles.affix)}>{prefix}</div>}

      <div className={cx(styles.anchor)}>{children}</div>

      {suffix && <div className={cx(styles.affix)}>{suffix}</div>}
    </div>
  );

  return (
    <section
      className={cx(
        styles.field,
        (compact || compactSpacing) &&
          !noSpacing &&
          styles.field_compactSpacing,
        noSpacing && styles.field_noSpacing
      )}
    >
      <div
        className={cx(
          inline && styles.content_inline,
          topAlign && styles.content_topAlign
        )}
      >
        {renderBeforeLabel && content}

        <label
          htmlFor={id}
          className={cx(
            styles.label,
            stretchLabel && styles.label_stretch,
            hideLabel && styles.label_hidden,
            (inline || renderBeforeLabel) && styles.label_noSpacing
          )}
        >
          <StatusText
            danger={invalid}
            muted={disabled}
            small={compact}
            bold={!renderLargeLabel}
          >
            {label}

            {optional && !hideOptionalLabel && (
              <span className={cx(styles.optional)}>
                <Text inline small muted>
                  (optional)
                </Text>
              </span>
            )}
          </StatusText>

          {labelDescription && <Text small>{labelDescription}</Text>}
        </label>

        {!renderBeforeLabel && content}
      </div>

      {invalid && <FormErrorMessage id={id} error={errorMessage} />}
    </section>
  );
};

FormField.propTypes = {
  compact: _pt.bool,
  compactSpacing: _pt.bool,
  disabled: _pt.bool,
  errorMessage: _pt.string,
  hideLabel: _pt.bool,
  hideOptionalLabel: _pt.bool,
  inline: _pt.bool,
  invalid: _pt.bool,
  label: _pt.any.isRequired,
  labelDescription: _pt.node,
  noSpacing: _pt.bool,
  optional: _pt.bool,
  prefix: _pt.node,
  suffix: _pt.node,
  children: _pt.any.isRequired,
  id: _pt.string.isRequired,
  renderBeforeLabel: _pt.bool,
  renderFullWidth: _pt.bool,
  renderLargeLabel: _pt.bool,
  stretchLabel: _pt.bool,
  topAlign: _pt.bool,
};

FormField.defaultProps = {
  compact: false,
  compactSpacing: false,
  disabled: false,
  errorMessage: "",
  hideLabel: false,
  hideOptionalLabel: false,
  inline: false,
  invalid: false,
  labelDescription: null,
  noSpacing: false,
  optional: false,
  prefix: null,
  renderBeforeLabel: false,
  renderFullWidth: false,
  renderLargeLabel: false,
  stretchLabel: false,
  suffix: null,
  topAlign: false,
};

export { partitionFieldProps, Prefix, Suffix };
export default FormField;
