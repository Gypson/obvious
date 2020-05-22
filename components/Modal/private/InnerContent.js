import React from "react";
import _pt from "prop-types";
import useStyles from "../../../hooks/useStyles";
import IconClose from "../../../../../icons/src/interface/IconClose";
import Text from "../../Text";
import Title from "../../Title";
import IconButton from "../../IconButton";
import useTheme from "../../../hooks/useTheme";
import { Z_INDEX_MODAL } from "../../../constants";
import toRGBA from "../../../utils/toRGBA";

const styleSheet = ({ ui, unit, color }) => ({
  wrapper: {
    position: "relative",
  },

  header: {
    padding: unit * 3,
  },

  header_scrollable: {
    position: "relative",

    ":after": {
      content: '" "',
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      height: unit / 2,
      background: `linear-gradient(${toRGBA(
        color.core.neutral[6],
        15
      )}, ${toRGBA(color.core.neutral[6], 0)})`,
    },
  },

  close: {
    position: "absolute",
    top: unit * 2,
    right: unit * 2,
    zIndex: Z_INDEX_MODAL,
  },

  close_float: {
    float: "right",
    position: "relative",
    top: 0,
    right: 0,
    margin: `${unit * 2}px ${unit * 2}px ${unit / 2}px ${unit / 2}px`,
  },

  body: {
    padding: `0 ${unit * 3}px`,
  },

  body_paddingBottom: {
    paddingBottom: unit * 3,
  },

  body_paddingTop: {
    paddingTop: unit * 3,
  },

  body_scrollable: {
    paddingBottom: unit * 3,
    maxHeight: 160,
    overflow: "auto",

    ":before": {
      content: '" "',
      position: "sticky",
      display: "block",
      width: `calc(100% + ${unit * 6}px)`,
      marginLeft: -unit * 3,
      height: unit / 2,
      background: color.accent.bg,
    },
  },

  body_scrollableLarge: {
    maxHeight: 300,
  },

  footer: {
    padding: unit * 3,
  },

  footer_scrollable: {
    borderTop: ui.border,
  },
});

const ModalInnerContent = ({
  children,
  footer,
  large,
  small,
  onClose,
  scrollable,
  subtitle,
  title,
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();
  const withHeader = Boolean(title || subtitle);
  const withFooter = Boolean(footer);

  return (
    <div className={cx(styles.wrapper)}>
      {withHeader && (
        <header
          className={cx(styles.header, scrollable && styles.header_scrollable)}
        >
          {title && <Title level={3}>{title}</Title>}
          {subtitle && <Text muted>{subtitle}</Text>}
        </header>
      )}

      <div className={cx(styles.close, !withHeader && styles.close_float)}>
        <IconButton onClick={onClose}>
          <IconClose
            accessibilityLabel="Close"
            color={theme.color.muted}
            size={theme.unit * 3}
          />
        </IconButton>
      </div>

      <div
        className={cx(
          styles.body,
          !withHeader && styles.body_paddingTop,
          !withFooter && styles.body_paddingBottom,
          scrollable && styles.body_scrollable,
          scrollable && (!small || large) && styles.body_scrollableLarge
        )}
      >
        {children}
      </div>

      {footer && (
        <footer
          className={cx(styles.footer, scrollable && styles.footer_scrollable)}
        >
          {footer}
        </footer>
      )}
    </div>
  );
};

ModalInnerContent.propTypes = {
  children: _pt.any.isRequired,
  footer: _pt.node,
  large: _pt.bool,
  scrollable: _pt.bool,
  small: _pt.bool,
  subtitle: _pt.node,
  title: _pt.node,
  onClose: _pt.func.isRequired,
};

ModalInnerContent.defaultProps = {
  footer: null,
  large: false,
  scrollable: false,
  small: false,
  subtitle: null,
  title: null,
};

export default ModalInnerContent;
