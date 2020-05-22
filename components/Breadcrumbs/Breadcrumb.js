import React from "react";
import _pt from "prop-types";
import useStyles from "../../hooks/useStyles";
import ButtonOrLink from "../basic/ButtonOrLink";
import DirectionalIcon from "../DirectionalIcon";
import IconChevronLeft from "../../../../icons/src/interface/IconChevronLeft";
import IconChevronRight from "../../../../icons/src/interface/IconChevronRight";

const styleSheet = ({ color, font, pattern, transition, unit }) => ({
  breadcrumb: {
    ...pattern.resetButton,
    ...font.textRegular,
    ...transition.box,
    color: color.core.neutral[5],
    cursor: "default",
    outline: "none"
  },

  breadcrumb_large: {
    ...font.textReset,
    ...font.title3
  },

  breadcrumb_clickable: {
    cursor: "pointer",

    "@selectors": {
      ":not([disabled]):hover, :not([disabled]):focus": {
        color: color.core.neutral[4]
      }
    }
  },

  breadcrumb_disabled: {
    ...pattern.disabled
  },

  breadcrumb_highlighted: {
    color: color.core.primary[3]
  },

  breadcrumb_highlighted_clickable: {
    "@selectors": {
      ":not([disabled]):hover, :not([disabled]):focus": {
        color: color.core.primary[4]
      }
    }
  },

  breadcrumb_selected: {
    fontWeight: font.weights.semibold
  },

  breadcrumb_center: {
    display: "flex",
    alignItems: "center"
  },

  li: {
    marginRight: unit,

    ":last-child": {
      marginRight: 0
    }
  }
});

const Breadcrumb = ({
  disabled,
  hideIcon,
  highlighted,
  label,
  large,
  href,
  onClick,
  selected,
  center
}) => {
  const [styles, cx] = useStyles(styleSheet);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const clickable = !disabled && (!!href || !!onClick);
  const aria = selected
    ? {
        "aria-current": "page"
      }
    : {};

  return (
    <li className={cx(styles.li)}>
      <ButtonOrLink
        {...aria}
        className={cx(
          styles.breadcrumb,
          large && styles.breadcrumb_large,
          clickable && styles.breadcrumb_clickable,
          highlighted && styles.breadcrumb_highlighted,
          clickable && highlighted && styles.breadcrumb_highlighted_clickable,
          selected && styles.breadcrumb_selected,
          disabled && styles.breadcrumb_disabled,
          center && styles.breadcrumb_center
        )}
        afterIcon={
          hideIcon ? null : (
            <DirectionalIcon
              direction="right"
              left={IconChevronLeft}
              right={IconChevronRight}
              size={24}
              decorative
            />
          )
        }
        disabled={disabled}
        href={href}
        onClick={handleClick}
      >
        {label}
      </ButtonOrLink>
    </li>
  );
};

Breadcrumb.propTypes = {
  disabled: _pt.bool,
  hideIcon: _pt.bool,
  highlighted: _pt.bool,
  label: _pt.string.isRequired,
  large: _pt.bool,
  last: _pt.bool,
  href: _pt.string,
  onClick: _pt.func,
  selected: _pt.bool
};

Breadcrumb.defaultProps = {
  disabled: false,
  hideIcon: false,
  highlighted: false,
  href: "",
  large: false,
  last: false,
  onClick: null,
  selected: false
};

export default Breadcrumb;
