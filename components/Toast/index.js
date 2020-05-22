import React from "react";
import _pt from "prop-types";
import { mutuallyExclusiveTrueProps } from "airbnb-prop-types";
import useStyles from "../../hooks/useStyles";
import IconClose from "../../../../icons/src/interface/IconClose";
import { getErrorMessage } from "../ErrorMessage";
import IconButton from "../IconButton";
import Button from "../Button";
import Text from "../Text";
import Spacing from "../Spacing";
import crosstab from "../../crosstab";

const statusPropType = mutuallyExclusiveTrueProps("danger", "success");
const styleSheet = ({ color, ui, unit }) => ({
  container: {
    marginTop: unit * 1.5,
    padding: unit * 2,
    backgroundColor: color.core.neutral[6],
    boxShadow: ui.boxShadowLarge,
    willChange: "transform, opacity",
    transform: "translateY(-100%)",
    transition: "transform .3s, opacity .3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    opacity: 0,
    lineHeight: 1,
    borderRadius: ui.borderRadius,
  },

  container_visible: {
    transform: "translateY(0)",
    opacity: 1,
  },

  container_success: {
    backgroundColor: color.core.success[3],
  },

  container_danger: {
    backgroundColor: color.core.danger[3],
  },

  right: {
    textAlign: "right",
    margin: -unit,
    marginLeft: unit,
  },
});

const Toast = ({ ...props }) => {
  const [styles, cx] = useStyles(styleSheet);
  const [visible, setVisible] = React.useState(false);
  const { message, title, danger, success, refresh } = props;
  const isError = message instanceof Error;
  const failed = danger || isError;
  let hideTimer = 0;

  React.useEffect(() => {
    const { delay = 0, duration = 0, crosstabClose } = props;
    window.setTimeout(showToast, delay);

    if (duration > 0) {
      hideTimer = window.setTimeout(handleClose, delay + duration);
    }

    if (crosstabClose) {
      crosstab.on(crosstabCloseEvent(), handleClose);
    }

    return () => {
      crosstab.off(crosstabCloseEvent(), handleClose);
    };
  }, []);

  React.useEffect(() => {
    if (visible) {
      if (props.onOpen) {
        props.onOpen();
      }
    } else {
      window.setTimeout(() => {
        if (props.onClose) {
          props.onClose();
        }

        if (props.onRemove) {
          props.onRemove(props.id);
        }
      }, 150);
    }
  }, [visible]);

  const showToast = () => {
    setVisible(true);
  };

  const handleClosePress = () => {
    handleClose();

    if (props.crosstabClose) {
      crosstab.emit(crosstabCloseEvent());
    }
  };

  const handleClose = () => {
    window.clearTimeout(hideTimer);

    setVisible(false);
  };

  /* istanbul ignore next */
  const handleRefreshPress = () => {
    global.location.reload();
  };

  const crosstabCloseEvent = () => {
    return `toast:crosstabClose:${props.id}`;
  };

  return (
    <div
      className={cx(
        styles.container,
        visible && styles.container_visible,
        failed && styles.container_danger,
        success && styles.container_success
      )}
      role="status"
    >
      {refresh ? (
        <div>
          <Text bold inverted>
            {message}
          </Text>

          <Spacing top={0.5}>
            <Button small onClick={handleRefreshPress}>
              Refresh
            </Button>
          </Spacing>
        </div>
      ) : (
        <div>
          {title && (
            <Text bold inverted>
              {title}
            </Text>
          )}

          <Text inverted>
            {isError ? getErrorMessage(message, true) : message}
          </Text>
        </div>
      )}

      <div className={cx(styles.right)}>
        <IconButton inverted onClick={handleClosePress}>
          <IconClose size="1.5em" accessibilityLabel="Close" />
        </IconButton>
      </div>
    </div>
  );
};

Toast.propTypes = {
  crosstabClose: _pt.bool,
  danger: statusPropType,
  delay: _pt.number,
  duration: _pt.number,
  id: _pt.string,
  message: _pt.oneOfType([_pt.string, _pt.instanceOf(Error)]).isRequired,
  onOpen: _pt.func,
  onClose: _pt.func,
  onRemove: _pt.func,
  refresh: _pt.bool,
  success: statusPropType,
  title: _pt.node,
};

Toast.defaultProps = {
  crosstabClose: false,
  danger: false,
  delay: 250,
  duration: 10000,
  id: null,
  onClose: null,
  onOpen: null,
  onRemove: null,
  refresh: false,
  success: false,
  title: null,
};

export default Toast;
