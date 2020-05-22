import React from "react";
import _pt from "prop-types";
import NormalButton from "../Button";
import DangerButton from "../DangerButton";
import MutedButton from "../MutedButton";
import ButtonGroup from "../ButtonGroup";

const FormActions = ({
  cancelText,
  continueText,
  danger,
  disabled,
  hideCancel,
  onCancel,
  onContinue,
  processing,
  processingText,
  resetText,
  showReset,
  small,
}) => {
  const Button = danger ? DangerButton : NormalButton;

  return (
    <ButtonGroup>
      <Button
        type="submit"
        onClick={onContinue}
        disabled={disabled}
        loading={processing}
        small={small}
      >
        {processing ? processingText || "Saving" : continueText || "Save"}
      </Button>

      {!hideCancel && (
        <MutedButton
          inverted
          onClick={onCancel}
          small={small}
          disabled={processing}
        >
          {cancelText || "Cancel"}
        </MutedButton>
      )}

      {showReset && (
        <MutedButton type="reset" inverted small={small} disabled={processing}>
          {resetText || "Reset"}
        </MutedButton>
      )}
    </ButtonGroup>
  );
};

FormActions.propTypes = {
  cancelText: _pt.node,
  continueText: _pt.node,
  danger: _pt.bool,
  disabled: _pt.bool,
  hideCancel: _pt.bool,
  onCancel: _pt.func,
  onContinue: _pt.func,
  processing: _pt.bool,
  processingText: _pt.node,
  resetText: _pt.node,
  showReset: _pt.bool,
  small: _pt.bool,
};

FormActions.defaultProps = {
  cancelText: null,
  continueText: null,
  danger: false,
  disabled: false,
  hideCancel: false,
  onCancel: null,
  onContinue: null,
  processing: false,
  processingText: null,
  resetText: null,
  showReset: false,
  small: false,
};

export default FormActions;
