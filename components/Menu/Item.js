import React from "react";
import _pt from "prop-types";
import { mutuallyExclusiveTrueProps } from "airbnb-prop-types";
import { STATUSES } from "../../constants";
import useStyles from "../../hooks/useStyles";
import ButtonOrLink from "../basic/ButtonOrLink";
import Text from "../Text";
import DirectionalIcon from "../DirectionalIcon";
import IconCaretLeft from "../../../../icons/src/interface/IconCaretLeft";
import IconCaretRight from "../../../../icons/src/interface/IconCaretRight";

const statusPropType = mutuallyExclusiveTrueProps(...STATUSES);

const styleSheet = ({ color, font, pattern, unit, transition }) => ({
  item: {
    ...transition.box,
    ...font.textRegular,
    width: "100%",
    padding: `${unit}px ${1.5 * unit}px`,
    border: 0,
    textAlign: "left",
    backgroundColor: "transparent",
    cursor: "pointer",
    textDecoration: "none",
    outlineOffset: "-3px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: color.accent.text,

    ":hover": {
      backgroundColor: color.accent.bgHover,
      color: color.core.neutral[6]
    },

    "@selectors": {
      // Fix content
      "> span": {
        flexGrow: 1
      },

      // Fix icons
      "> div": {
        flexGrow: 0,
        margin: 0,

        ":first-child": { marginRight: unit },
        ":last-child": { marginLeft: unit }
      }
    }
  },

  danger: {
    ":hover": {
      backgroundColor: color.core.danger[1],
      color: color.core.danger[6]
    }
  },

  info: {
    ":hover": {
      backgroundColor: color.core.primary[1],
      color: color.core.primary[6]
    }
  },

  notice: {
    ":hover": {
      backgroundColor: color.core.secondary[1],
      color: color.core.secondary[6]
    }
  },

  success: {
    ":hover": {
      backgroundColor: color.core.success[1],
      color: color.core.success[6]
    }
  },

  warning: {
    ":hover": {
      backgroundColor: color.core.warning[1],
      color: color.core.warning[6]
    }
  },

  item_spacious: {
    padding: unit * 2
  },

  item_disabled: {
    ...pattern.disabled
  },

  item_highlighted: {
    backgroundColor: color.accent.bgHover
  },

  submenu: {
    position: "absolute",
    top: -1,
    left: "99%"
  }
});

const MenuItem = ({
  children,
  disabled,
  highlighted,
  href,
  icon,
  onClick,
  openInNewWindow,
  role,
  spacious,
  submenu,
  tabIndex,
  tip,
  danger,
  info,
  notice,
  success,
  warning
}) => {
  const [styles, cx] = useStyles(styleSheet);
  const [showSubmenu, setShowSubmenu] = React.useState(false);
  const handleMouseEnter = () => {
    setShowSubmenu(true);
  };
  const handleMouseLeave = () => {
    setShowSubmenu(false);
  };

  const after = submenu ? (
    <DirectionalIcon
      direction="right"
      left={IconCaretLeft}
      right={IconCaretRight}
      size="6"
      decorative
    />
  ) : (
    tip
  );

  return (
    <li
      role="none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <ButtonOrLink
        afterIcon={
          after ? (
            <Text muted small>
              {after}
            </Text>
          ) : null
        }
        beforeIcon={icon}
        disabled={disabled}
        href={href}
        onClick={onClick}
        openInNewWindow={openInNewWindow}
        role={role}
        tabIndex={tabIndex}
        aria-haspopup={!!submenu}
        aria-expanded={showSubmenu}
        className={cx(
          styles.item,
          danger && styles.danger,
          info && styles.info,
          notice && styles.notice,
          success && styles.succes,
          warning && styles.warning,
          (showSubmenu || highlighted) && styles.item_highlighted,
          disabled && styles.item_disabled,
          spacious && styles.item_spacious
        )}
      >
        {children}
      </ButtonOrLink>

      {showSubmenu && <div className={cx(styles.submenu)}>{submenu}</div>}
    </li>
  );
};

MenuItem.propTypes = {
  tip: _pt.node,
  tabIndex: _pt.number,
  submenu: _pt.node,
  spacious: _pt.bool,
  role: _pt.string,
  openInNewWindow: _pt.bool,
  onClick: _pt.func,
  href: _pt.string,
  highlighted: _pt.bool,
  disabled: _pt.bool,
  children: _pt.any.isRequired,
  icon: _pt.node,
  danger: statusPropType,
  info: statusPropType,
  notice: statusPropType,
  success: statusPropType,
  warning: statusPropType
};

MenuItem.defaultProps = {
  danger: false,
  disabled: false,
  highlighted: false,
  href: "",
  icon: null,
  info: false,
  notice: false,
  onClick: null,
  openInNewWindow: false,
  role: "menuitem",
  spacious: false,
  submenu: null,
  success: false,
  tabIndex: -1,
  tip: null,
  warning: false
};

export default MenuItem;
