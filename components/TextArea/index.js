import React from "react";
import uuid from "uuid/v4";
import BaseTextArea from "../basic/BaseTextArea";
import FormField, { partitionFieldProps } from "../FormField";

const TextArea = ({ ...props }) => {
  const [id] = React.useState(uuid());
  const { fieldProps, inputProps } = partitionFieldProps(props);
  const { locale, proofread, ...textareaProps } = inputProps;
  const description =
    fieldProps.labelDescription ||
    (inputProps.maxLength &&
      `${inputProps.value.length.toLocaleString()}/${inputProps.maxLength.toLocaleString()} characters used`);
  return (
    <FormField {...fieldProps} id={id} labelDescription={description}>
      <BaseTextArea {...textareaProps} id={id} />
    </FormField>
  );
};

export default TextArea;
