import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import Portal from "../Portal";
import ModalInner from "./private/Inner";
import { ESCAPE } from "../../keys";
import { Z_INDEX_MODAL } from "../../constants";
import toRGBA from "../../utils/toRGBA";

const styleSheet = ({ color, unit }) => ({
  container: {
    bottom: 0,
    left: 0,
    overflowY: "auto",
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: Z_INDEX_MODAL
  },

  wrapper: {
    alignItems: "center",
    backgroundColor: toRGBA(color.core.neutral[6], 75),
    display: "flex",
    justifyContent: "center",
    minHeight: "100%",
    padding: unit * 2,
    width: "100%"
  }
});

const Modal = ({ onClose, ...props }) => {
  const [styles, cx] = useStyles(styleSheet);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = event => {
    onClose(event);
  };

  const handleKeyUp = event => {
    if (event.key === ESCAPE) {
      handleClose(event);
    }
  };

  return (
    <Portal>
      <div className={cx(styles.container)}>
        <div
          onKeyUp={handleKeyUp}
          role="presentation"
          className={cx(styles.wrapper)}
        >
          <ModalInner onClose={handleClose} {...props} />
        </div>
      </div>
    </Portal>
  );
};

Modal.propTypes = {
  onClose: _pt.func.isRequired
};

export default Modal;
