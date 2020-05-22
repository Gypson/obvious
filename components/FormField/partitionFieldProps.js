const partitionFieldProps = ({
  children = null,
  compact = false,
  compactSpacing = false,
  disabled = false,
  errorMessage = '',
  field = {},
  hideLabel = false,
  hideOptionalLabel = false,
  inline = false,
  invalid = false,
  label,
  labelDescription = '',
  noSpacing = false,
  optional = false,
  prefix = null,
  suffix = null,
  ...inputProps
}) => {
  return {
    children,
    field,
    fieldProps: {
      compact,
      compactSpacing,
      disabled,
      errorMessage,
      hideLabel,
      hideOptionalLabel,
      inline,
      invalid,
      label,
      labelDescription,
      noSpacing,
      optional,
      prefix,
      suffix,
    },
    inputProps: {
      value: '',
      ...inputProps,
      compact,
      disabled,
      hasPrefix: !!prefix,
      hasSuffix: !!suffix,
      invalid,
      optional,
    },
  };
};

export default partitionFieldProps;
