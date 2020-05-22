import React from "react";
import { mutuallyExclusiveTrueProps } from "airbnb-prop-types";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import useTheme from "../../hooks/useTheme";
import Row from "../Row";
import Spacing from "../Spacing";
import Text from "../Text";
import IconButton from "../IconButton";
import { STATUSES } from "../../constants";
import IconWarning from "../../../../icons/src/interface/IconWarning";
import IconError from "../../../../icons/src/interface/IconError";
import IconInfo from "../../../../icons/src/interface/IconInfo";
import IconCheckAlt from "../../../../icons/src/interface/IconCheckAlt";
import IconFlag from "../../../../icons/src/interface/IconFlag";
import IconClose from "../../../../icons/src/interface/IconClose";

const alertColorTypePropType = mutuallyExclusiveTrueProps(...STATUSES);

const styleSheet = ({ color, pattern, unit }) => ({
  alert: {
    ...pattern.box,
    display: "block",
    alignItems: "start",
    position: "relative",
    borderColor: color.core.neutral[1],
    backgroundColor: color.accent.bg,
    overflow: "hidden",
    padding: unit * 3,

    ":before": {
      content: '" "',
      backgroundColor: color.accent.text,
      position: "absolute",
      top: 0,
      left: 0,
      width: unit / 2,
      height: "100%",
    },
  },

  alert_inline: {
    display: "inline-block",
  },

  alert_danger: {
    ":before": {
      backgroundColor: color.core.danger[3],
    },
  },

  alert_full_danger: {
    backgroundColor: color.core.danger[3],
    color: color.base,
  },

  alert_info: {
    ":before": {
      backgroundColor: color.core.primary[3],
    },
  },

  alert_full_info: {
    backgroundColor: color.core.primary[3],
    color: color.base,
  },

  alert_notice: {
    ":before": {
      backgroundColor: color.core.secondary[3],
    },
  },

  alert_full_notice: {
    backgroundColor: color.core.secondary[3],
    color: color.base,
  },

  alert_success: {
    ":before": {
      backgroundColor: color.core.success[3],
    },
  },

  alert_full_success: {
    backgroundColor: color.core.success[3],
    color: color.base,
  },

  alert_warning: {
    ":before": {
      backgroundColor: color.core.warning[3],
    },
  },

  alert_full_warning: {
    backgroundColor: color.core.warning[3],
    color: color.base,
  },

  alert_statusIcon: {
    paddingLeft: unit * 2.5,
  },
});

const Alert = ({
  children,
  danger,
  hideStatusIcon,
  info,
  inline,
  notice,
  success,
  title,
  warning,
  onClose,
  full,
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const theme = useTheme();
  const { color, unit } = theme;
  let StatusIcon = null;
  let iconColor = color.accent.text;

  if (danger) {
    StatusIcon = IconError;
    iconColor = color.core.danger[3];
  } else if (info) {
    StatusIcon = IconInfo;
    iconColor = color.core.primary[3];
  } else if (notice) {
    StatusIcon = IconFlag;
    iconColor = color.core.secondary[3];
  } else if (success) {
    StatusIcon = IconCheckAlt;
    iconColor = color.core.success[3];
  } else if (warning) {
    StatusIcon = IconWarning;
    iconColor = color.core.warning[3];
  }

  return (
    <div
      className={cx(
        styles.alert,
        inline && styles.alert_inline,
        !hideStatusIcon && !!StatusIcon && styles.alert_statusIcon,
        danger && styles.alert_danger,
        info && styles.alert_info,
        notice && styles.alert_notice,
        success && styles.alert_success,
        warning && styles.alert_warning,
        full && danger && styles.alert_full_danger,
        full && info && styles.alert_full_info,
        full && notice && styles.alert_full_notice,
        full && success && styles.alert_full_success,
        full && warning && styles.alert_full_warning
      )}
    >
      <Row
        middleAlign={!children}
        after={
          onClose && (
            <IconButton onClick={onClose}>
              <IconClose accessibilityLabel="Close" size={unit * 3} />
            </IconButton>
          )
        }
        before={
          !hideStatusIcon &&
          StatusIcon && (
            <StatusIcon decorative color={iconColor} size={unit * 3} />
          )
        }
      >
        <Text bold inverted={full}>
          {title}
        </Text>

        {children && (
          <Spacing top={1}>
            <Text>{children}</Text>
          </Spacing>
        )}
      </Row>
    </div>
  );
};

Alert.propTypes = {
  onClose: _pt.func,
  title: _pt.any.isRequired,
  inline: _pt.bool,
  hideStatusIcon: _pt.bool,
  children: _pt.any,
  danger: alertColorTypePropType,
  full: _pt.bool,
  info: alertColorTypePropType,
  notice: alertColorTypePropType,
  success: alertColorTypePropType,
  warning: alertColorTypePropType,
};

Alert.defaultProps = {
  children: null,
  danger: false,
  full: false,
  hideStatusIcon: false,
  info: false,
  inline: false,
  notice: false,
  onClose: null,
  success: false,
  warning: false,
};

export default Alert;
