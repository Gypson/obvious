import React from "react";
import _pt from "prop-types";
import useStyles from "../../../hooks/useStyles";
import FocusTrap from "../../FocusTrap";
import focusFirstFocusableChild from "../../../utils/focus/focusFirstFocusableChild";
import ModalImageLayout from "./ImageLayout";
import ModalInnerContent from "./InnerContent";

export const MODAL_MAX_WIDTH_SMALL = 400;
export const MODAL_MAX_WIDTH_MEDIUM = 600;
export const MODAL_MAX_WIDTH_LARGE = 800;

const styleSheet = ({ ui, responsive, color }) => ({
  content: {
    backgroundColor: color.accent.bg,
    borderRadius: ui.borderRadius,
    boxShadow: ui.boxShadowLarge,
    maxWidth: MODAL_MAX_WIDTH_MEDIUM,
    position: "relative",
    width: "100%",

    ":focus": {
      outline: "none"
    }
  },

  content_small: {
    maxWidth: MODAL_MAX_WIDTH_SMALL
  },

  content_large: {
    maxWidth: MODAL_MAX_WIDTH_LARGE
  },

  content_fluid: {
    maxWidth: "70%",

    "@media": {
      [responsive.small]: {
        maxWidth: "85%"
      }
    }
  }
});

const ModalInner = ({
  children,
  footer,
  image,
  large,
  small,
  fluid,
  onClose,
  scrollable,
  subtitle,
  title
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const dialogRef = React.createRef();
  let lastActiveElement = null;
  let openTimeout;

  React.useEffect(() => {
    handleOpen();
    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);

      if (openTimeout) {
        window.clearTimeout(openTimeout);
      }

      if (lastActiveElement) {
        lastActiveElement.focus();
      }
    };
  }, []);

  const handleClickOutside = event => {
    const { current } = dialogRef;

    if (current && current.contains(event.target)) {
      return;
    }

    handleClose(event);
  };

  const handleOpen = () => {
    lastActiveElement = document.activeElement;

    // Putting this in a setTimeout helps screen readers notice that focus has changed.
    openTimeout = window.setTimeout(() => {
      const { current: dialogRefElement } = dialogRef;

      if (dialogRefElement) {
        focusFirstFocusableChild(dialogRefElement);
      }
    }, 0);
  };

  const handleClose = event => {
    onClose(event);
  };

  const showLargeContent = large || !small || !!image;

  const innerContent = (
    <ModalInnerContent
      footer={footer}
      large={showLargeContent}
      small={small}
      scrollable={scrollable}
      subtitle={subtitle}
      title={title}
      onClose={handleClose}
    >
      {children}
    </ModalInnerContent>
  );

  return (
    <div
      aria-modal
      role="dialog"
      ref={dialogRef}
      className={cx(
        styles.content,
        small && styles.content_small,
        (large || !!image) && styles.content_large,
        fluid && styles.content_fluid
      )}
    >
      <FocusTrap>
        {image ? (
          <ModalImageLayout {...image}>{innerContent}</ModalImageLayout>
        ) : (
          innerContent
        )}
      </FocusTrap>
    </div>
  );
};

ModalInner.propTypes = {
  children: _pt.any.isRequired,
  fluid: _pt.bool,
  footer: _pt.node,
  image: _pt.any,
  large: _pt.bool,
  scrollable: _pt.bool,
  small: _pt.bool,
  subtitle: _pt.node,
  title: _pt.node,
  onClose: _pt.func.isRequired
};

ModalInner.defaultProps = {
  fluid: false,
  footer: null,
  image: null,
  large: false,
  scrollable: false,
  small: false,
  subtitle: null,
  title: null
};

export default ModalInner;
